# СВОих девчонок не бросаем!

Платформа помощи семьям участников СВО.  
Автор и оператор: АНО «Дирекция социальной архитектуры».  
Пилот: Чувашская Республика.

Это актуальная React-версия сайта. Старый портал, разделы «Уроки» и «Память» в проект не входят.

## Как открыть локально

```bash
npm install
npm run dev
```

Сайт откроется в режиме разработки.

## Как выложить на GitHub и Vercel

1. Создайте или откройте репозиторий `https://github.com/Roma1718/svoih-devchonok.git`
2. В папке этого проекта выполните:

```bash
git init
git add .
git commit -m "Актуальная версия платформы"
git branch -M main
git remote remove origin
git remote add origin https://github.com/Roma1718/svoih-devchonok.git
git push -u origin main --force
```

`--force` нужен, чтобы полностью заменить старую версию на GitHub.

3. На [vercel.com](https://vercel.com) откройте проект `svoih-devchonok`.
4. **Deployments →** три точки у свежей сборки → **Redeploy**.
5. Снимите галочку **Use existing Build Cache**.

Адрес сайта: [https://svoih-devchonok.vercel.app](https://svoih-devchonok.vercel.app)

## Демо-вход

| Роль | Почта | Пароль |
|---|---|---|
| Координатор | admin@svoihdevchonok.ru | admin123 |
| Семья | family@example.ru | family123 |
| Наставник | teacher@example.ru | teacher123 |
| Студент-волонтёр | volunteer@example.ru | volunteer123 |
