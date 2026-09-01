from __future__ import annotations

import os
import sqlite3
from datetime import datetime
from functools import wraps
from pathlib import Path
from typing import Any

from flask import Flask, flash, g, redirect, render_template, request, session, url_for
from werkzeug.security import check_password_hash, generate_password_hash

BASE_DIR = Path(__file__).resolve().parent
DATABASE = BASE_DIR / 'instance' / 'portal.db'

app = Flask(__name__)
app.config.update(
    SECRET_KEY=os.environ.get('SECRET_KEY', 'dev-secret-change-me'),
    DATABASE=str(DATABASE),
    SITE_NAME='СВОих девчонок не бросаем!',
    SLOGAN='Вместе сильнее в цифровом мире',
    PILOT_REGION='Чувашская Республика',
)

NAV = [
    {'title': 'Главная', 'endpoint': 'index'},
    {'title': 'О проекте', 'endpoint': 'about'},
    {'title': 'Меры поддержки', 'endpoint': 'support'},
    {'title': 'Уроки', 'endpoint': 'lessons'},
    {'title': 'Лаборатория', 'endpoint': 'lab'},
    {'title': 'Память и культура', 'endpoint': 'memory'},
    {'title': 'Личный кабинет', 'endpoint': 'dashboard'},
]

SUPPORT_MEASURES = [
    {'title': 'Шаг в мирную жизнь', 'category': 'Занятость и адаптация', 'org': 'Правительство Чувашской Республики / Минтруд Чувашии', 'summary': 'Адаптация и трудоустройство ветеранов.'},
    {'title': 'Десант поддержки', 'category': 'Адресная помощь', 'org': 'Минтруд Чувашии, центры занятости, фонд «Защитники Отечества»', 'summary': 'Мобильные группы в муниципалитетах.'},
    {'title': 'СВОи в бизнесе', 'category': 'Предпринимательство', 'org': 'Центр «Мой бизнес» Чувашской Республики', 'summary': 'Обучение и запуск бизнеса для ветеранов.'},
    {'title': 'Ежемесячные выплаты детям школьникам', 'category': 'Поддержка детей', 'org': 'Минтруд Чувашии / Центр предоставления мер соцподдержки', 'summary': 'Ежемесячная денежная поддержка школьников из семей участников СВО.'},
    {'title': 'Бесплатное двухразовое горячее питание', 'category': 'Школа', 'org': 'Министерство образования и молодежной политики Чувашии', 'summary': 'Поддержка школьников в образовательной среде.'},
    {'title': 'Бесплатные кружки, секции, лагеря, культура и спорт', 'category': 'Развитие детей', 'org': 'Минобр Чувашии и Минкульт Чувашии', 'summary': 'Доступ к творческим, спортивным и культурным программам.'},
    {'title': 'Специальная стипендия Главы для студентов', 'category': 'Высшее образование', 'org': 'Министерство образования и молодежной политики Чувашии', 'summary': 'Поддержка студентов из семей участников СВО.'},
    {'title': 'Медицинская реабилитация', 'category': 'Здоровье', 'org': 'Министерство здравоохранения Чувашской Республики', 'summary': 'Система реабилитации и сопровождения.'},
    {'title': 'Бесплатная психологическая помощь', 'category': 'Психологическая поддержка', 'org': 'Министерство здравоохранения Чувашской Республики', 'summary': 'Консультации и сопровождение взрослых и детей.'},
    {'title': 'Бесплатная юридическая помощь', 'category': 'Право', 'org': 'Адвокатская палата Чувашской Республики, органы власти, МФЦ', 'summary': 'Юридические консультации по льготам, документам и правам.'},
]

LESSON_COURSES = [
    {'slug': 'vsem-mirom', 'title': 'Всем миром', 'age': '5–8 классы', 'format': 'Классный час + семейное задание', 'summary': 'Урок о традициях Ниме, помочи, взаимовыручки и общественной ответственности.', 'duration': '45 минут'},
    {'slug': 'heroes-memory', 'title': 'Память о защитниках', 'age': '7–11 классы', 'format': 'Мультимедийный урок', 'summary': 'Школьники изучают семейную память, местную историю и создают цифровые портреты героев.', 'duration': '60 минут'},
    {'slug': 'digital-kindness', 'title': 'Цифровая доброта', 'age': '5–11 классы', 'format': 'Практикум', 'summary': 'Как цифровая среда может усиливать взаимопомощь, а не раскол.', 'duration': '45 минут'},
    {'slug': 'volunteer-lab', 'title': 'Лаборатория общественных дел', 'age': 'СПО / Вузы', 'format': 'Проектная сессия', 'summary': 'Команды проектируют волонтёрские, культурные и образовательные инициативы для региона.', 'duration': '90 минут'},
]

NEWS_ITEMS = [
    {'title': 'Старт пилотного портала в Чувашской Республике', 'text': 'Портал собирает меры поддержки, уроки, культурные проекты памяти и работу лаборатории в единую цифровую среду.'},
    {'title': 'Открыт модуль «Уроки»', 'text': 'Школы, колледжи и вузы получают готовые занятия, сценарии и материалы для просветительской работы.'},
    {'title': 'Запущен кабинет координатора', 'text': 'Координаторы муниципалитетов видят заявки, статусы помощи, события и проектные команды.'},
]

ROLE_LABELS = {
    'family': 'Семья',
    'volunteer': 'Волонтёр',
    'coordinator': 'Координатор',
    'teacher': 'Педагог',
    'partner': 'Партнёр',
}


def get_db() -> sqlite3.Connection:
    if 'db' not in g:
        g.db = sqlite3.connect(app.config['DATABASE'])
        g.db.row_factory = sqlite3.Row
    return g.db


@app.teardown_appcontext
def close_db(_: Any) -> None:
    db = g.pop('db', None)
    if db is not None:
        db.close()


def init_db() -> None:
    db = sqlite3.connect(app.config['DATABASE'])
    with open(BASE_DIR / 'schema.sql', 'r', encoding='utf-8') as f:
        db.executescript(f.read())
    seed(db)
    db.commit()
    db.close()


def build_lesson_body(title: str) -> str:
    return (
        f'{title}\n\n'
        'Цель урока: показать детям и молодёжи, как память о защитниках, взаимопомощь и цифровая культура собираются в единое общественное действие.\n\n'
        'Структура:\n'
        '1. Вступление учителя.\n'
        '2. Разговор о семье, памяти и взаимной ответственности.\n'
        '3. Просмотр мультимедийного материала или карточек героев.\n'
        '4. Практическое задание: написать историю семьи, создать цифровую открытку, карту добрых дел или сценарий акции.\n'
        '5. Итоговое обсуждение и общественный вывод.\n\n'
        'Результат: школьник понимает, что участие в общем деле начинается с конкретного поступка и уважения к семье защитника.'
    )


def seed(db: sqlite3.Connection) -> None:
    count = db.execute('SELECT COUNT(*) FROM users').fetchone()[0]
    if count:
        return

    users = [
        ('admin@svoihdevchonok.ru', generate_password_hash('admin123'), 'Администратор проекта', 'coordinator', 'Чебоксары'),
        ('family@example.ru', generate_password_hash('family123'), 'Семья защитника', 'family', 'Новочебоксарск'),
        ('teacher@example.ru', generate_password_hash('teacher123'), 'Педагог', 'teacher', 'Чебоксары'),
        ('volunteer@example.ru', generate_password_hash('volunteer123'), 'Волонтёр', 'volunteer', 'Канаш'),
    ]
    db.executemany('INSERT INTO users (email, password_hash, full_name, role, municipality) VALUES (?, ?, ?, ?, ?)', users)

    for item in SUPPORT_MEASURES:
        db.execute(
            'INSERT INTO support_measures (title, category, organization, summary) VALUES (?, ?, ?, ?)',
            (item['title'], item['category'], item['org'], item['summary']),
        )

    for course in LESSON_COURSES:
        db.execute(
            'INSERT INTO lessons (slug, title, age_group, format, duration, summary, body) VALUES (?, ?, ?, ?, ?, ?, ?)',
            (course['slug'], course['title'], course['age'], course['format'], course['duration'], course['summary'], build_lesson_body(course['title'])),
        )

    applications = [
        (1, 'psychology', 'Нужна консультация для матери и ребёнка', 'new'),
        (2, 'lesson', 'Школа просит подключить модуль уроков памяти', 'in_progress'),
        (1, 'culture', 'Просьба помочь включить семью в региональный проект памяти', 'done'),
    ]
    db.executemany('INSERT INTO applications (user_id, type, message, status) VALUES (?, ?, ?, ?)', applications)

    events = [
        ('Лаборатория социальной архитектуры', 'Онлайн сессия лидеров команд по цифровой платформе, культуре и урокам.', '2026-03-20 11:00', 'Онлайн'),
        ('Просветительский демопроект для школ', 'Презентация уроков и проектных сценариев для педагогов Чувашии.', '2026-03-26 14:00', 'Чебоксары'),
        ('Муниципальный круглый стол', 'Координация общественных и культурных проектов поддержки семей.', '2026-04-02 12:00', 'Новочебоксарск'),
    ]
    db.executemany('INSERT INTO events (title, description, starts_at, place) VALUES (?, ?, ?, ?)', events)


def query_db(query: str, args: tuple[Any, ...] = (), one: bool = False):
    cur = get_db().execute(query, args)
    rows = cur.fetchall()
    cur.close()
    return (rows[0] if rows else None) if one else rows


def execute_db(query: str, args: tuple[Any, ...] = ()) -> int:
    db = get_db()
    cur = db.execute(query, args)
    db.commit()
    return cur.lastrowid


def login_required(view):
    @wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            flash('Нужно войти в личный кабинет.', 'warning')
            return redirect(url_for('login'))
        return view(**kwargs)

    return wrapped_view


@app.before_request
def load_logged_in_user() -> None:
    user_id = session.get('user_id')
    g.user = query_db('SELECT * FROM users WHERE id = ?', (user_id,), one=True) if user_id else None


@app.context_processor
def inject_globals() -> dict[str, Any]:
    return {'nav': NAV, 'current_year': datetime.now().year, 'role_labels': ROLE_LABELS}


@app.route('/')
def index():
    measures_count = query_db('SELECT COUNT(*) AS c FROM support_measures', one=True)['c']
    lessons_count = query_db('SELECT COUNT(*) AS c FROM lessons', one=True)['c']
    events = query_db('SELECT * FROM events ORDER BY starts_at ASC LIMIT 3')
    return render_template('index.html', measures_count=measures_count, lessons_count=lessons_count, news_items=NEWS_ITEMS, events=events)


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/support')
def support():
    category = request.args.get('category', '')
    if category:
        rows = query_db('SELECT * FROM support_measures WHERE category = ? ORDER BY title ASC', (category,))
    else:
        rows = query_db('SELECT * FROM support_measures ORDER BY category ASC, title ASC')
    categories = query_db('SELECT DISTINCT category FROM support_measures ORDER BY category ASC')
    return render_template('support.html', measures=rows, categories=categories, active_category=category)


@app.route('/lessons')
def lessons():
    rows = query_db('SELECT * FROM lessons ORDER BY id ASC')
    return render_template('lessons.html', lessons=rows)


@app.route('/lessons/<slug>')
def lesson_detail(slug: str):
    lesson = query_db('SELECT * FROM lessons WHERE slug = ?', (slug,), one=True)
    if lesson is None:
        return render_template('404.html'), 404
    materials = ['Презентация урока', 'Карточки обсуждения', 'Практическое задание', 'Методические рекомендации для педагога']
    return render_template('lesson_detail.html', lesson=lesson, materials=materials)


@app.route('/memory')
def memory():
    projects = [
        {'title': 'Цифровые портреты героев', 'text': 'Школьники, музеи и дизайнеры создают медиаматериалы памяти и благодарности.'},
        {'title': 'Маршруты дополненной реальности', 'text': 'Городские и сельские пространства связываются с историями семей, защитников и местной памяти.'},
        {'title': 'Выставки и общественные события', 'text': 'Культура выступает активной средой общественной консолидации.'},
    ]
    return render_template('memory.html', projects=projects)


@app.route('/lab')
def lab():
    tracks = [
        'Цифровая платформа и сервисы помощи',
        'Культурные проекты памяти и благодарности',
        'Просветительская и образовательная работа',
        'Муниципальная координация и медиапространство',
        'Бизнес, волонтёры и общественные партнёры',
    ]
    return render_template('lab.html', tracks=tracks)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email'].strip().lower()
        password = request.form['password']
        error = None
        user = query_db('SELECT * FROM users WHERE email = ?', (email,), one=True)

        if user is None or not check_password_hash(user['password_hash'], password):
            error = 'Неверная почта или пароль.'

        if error is None:
            session.clear()
            session['user_id'] = user['id']
            flash('Вход выполнен.', 'success')
            return redirect(url_for('dashboard'))

        flash(error, 'danger')

    demo_accounts = [
        {'email': 'admin@svoihdevchonok.ru', 'password': 'admin123', 'role': 'Координатор'},
        {'email': 'family@example.ru', 'password': 'family123', 'role': 'Семья'},
        {'email': 'teacher@example.ru', 'password': 'teacher123', 'role': 'Педагог'},
        {'email': 'volunteer@example.ru', 'password': 'volunteer123', 'role': 'Волонтёр'},
    ]
    return render_template('login.html', demo_accounts=demo_accounts)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        full_name = request.form['full_name'].strip()
        email = request.form['email'].strip().lower()
        password = request.form['password']
        role = request.form['role']
        municipality = request.form['municipality'].strip()

        error = None
        if not full_name or not email or not password:
            error = 'Заполните обязательные поля.'
        elif query_db('SELECT id FROM users WHERE email = ?', (email,), one=True):
            error = 'Пользователь с такой почтой уже существует.'

        if error is None:
            execute_db(
                'INSERT INTO users (email, password_hash, full_name, role, municipality) VALUES (?, ?, ?, ?, ?)',
                (email, generate_password_hash(password), full_name, role, municipality),
            )
            flash('Регистрация завершена. Теперь войдите в кабинет.', 'success')
            return redirect(url_for('login'))

        flash(error, 'danger')

    return render_template('register.html')


@app.route('/logout')
def logout():
    session.clear()
    flash('Вы вышли из кабинета.', 'info')
    return redirect(url_for('index'))


@app.route('/dashboard')
@login_required
def dashboard():
    apps = query_db('SELECT * FROM applications WHERE user_id = ? ORDER BY created_at DESC', (g.user['id'],))
    events = query_db('SELECT * FROM events ORDER BY starts_at ASC LIMIT 5')
    lessons_rows = query_db('SELECT * FROM lessons ORDER BY id ASC LIMIT 4')
    return render_template('dashboard.html', apps=apps, events=events, lessons=lessons_rows)


@app.route('/applications/new', methods=['POST'])
@login_required
def new_application():
    app_type = request.form['type']
    message = request.form['message'].strip()
    if not message:
        flash('Опишите запрос.', 'danger')
        return redirect(url_for('dashboard'))
    execute_db('INSERT INTO applications (user_id, type, message, status) VALUES (?, ?, ?, ?)', (g.user['id'], app_type, message, 'new'))
    flash('Заявка отправлена координатору.', 'success')
    return redirect(url_for('dashboard'))


@app.route('/coordinator')
@login_required
def coordinator():
    if g.user['role'] != 'coordinator':
        flash('Раздел доступен координатору.', 'warning')
        return redirect(url_for('dashboard'))
    applications = query_db('SELECT applications.*, users.full_name, users.role, users.municipality FROM applications JOIN users ON users.id = applications.user_id ORDER BY applications.created_at DESC')
    users = query_db('SELECT * FROM users ORDER BY created_at DESC')
    return render_template('coordinator.html', applications=applications, users=users)


@app.route('/applications/<int:app_id>/status', methods=['POST'])
@login_required
def update_status(app_id: int):
    if g.user['role'] != 'coordinator':
        flash('Изменение статуса доступно координатору.', 'warning')
        return redirect(url_for('dashboard'))
    status = request.form['status']
    execute_db('UPDATE applications SET status = ? WHERE id = ?', (status, app_id))
    flash('Статус обновлён.', 'success')
    return redirect(url_for('coordinator'))


@app.errorhandler(404)
def not_found(_: Any):
    return render_template('404.html'), 404


if __name__ == '__main__':
    DATABASE.parent.mkdir(parents=True, exist_ok=True)
    if not DATABASE.exists():
        init_db()
    app.run(debug=True)
