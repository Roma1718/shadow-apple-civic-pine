# SVOihdevchonok.ru

Пилотный портал проекта **«СВОих девчонок не бросаем!»** для Чувашской Республики.

## Что внутри

- Flask backend
- SQLite база данных
- личные кабинеты
- кабинет координатора
- модуль мер поддержки
- модуль уроков
- модуль памяти и культуры
- модуль лаборатории социальной архитектуры

## Структура

- `app.py` — сервер и маршруты
- `schema.sql` — схема базы данных
- `templates/` — HTML шаблоны
- `static/css/style.css` — единый стиль
- `static/js/app.js` — базовый JS
- `instance/portal.db` — база данных создаётся автоматически при первом запуске

## Установка

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

## Демо-доступы

- координатор: `admin@svoihdevchonok.ru` / `admin123`
- семья: `family@example.ru` / `family123`
- педагог: `teacher@example.ru` / `teacher123`
- волонтёр: `volunteer@example.ru` / `volunteer123`

## Важно

В контейнере сборки Flask не был предустановлен, поэтому здесь я не запускал сервер локально. Код подготовлен как разворачиваемый проект.
