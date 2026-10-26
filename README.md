# YouTube 2.0 Portfolio

Проект состоит из двух частей:

- `frontend/` — Next.js 15 (React 19), dev-сервер на `http://localhost:3000`
- `Backend/` — Elysia + Bun, API на `http://localhost:3001`, Swagger: `http://localhost:3001/swagger`

Бэкенду нужны PostgreSQL и Redis (Redis используется для очереди обработки видео через BullMQ + ffmpeg).

## Требования

- [Bun](https://bun.sh/)
- Docker + Docker Compose
- `ffmpeg` и `ffprobe` (нужны для обработки загруженных видео). Установка: `sudo apt install ffmpeg` (Ubuntu/Debian) или `brew install ffmpeg` (macOS).

## Запуск

### 1. База данных и Redis

Из корня проекта:

```bash
docker compose up -d
```

Поднимутся:

- PostgreSQL на `localhost:5432`
- Redis на `localhost:6379`

Проверить: `docker compose ps`

### 2. Бэкенд

```bash
cd Backend
cp .env.example .env     # Windows: copy .env.example .env
bun install              # при установке автоматически выполнится prisma generate
bunx prisma migrate deploy
bun run seed             # опционально: демо-данные (очищает БД!)
bun run dev
```

Что делает `cp .env.example .env`: создаёт локальный файл с настройками подключения к Postgres/Redis и dev-секретами. Значения по умолчанию уже совпадают с `docker-compose.yml`, менять их для локального запуска не нужно.

Сервер поднимется на `http://localhost:3001`.

### Демо-аккаунты (после `bun run seed`)

| Email | Пароль |
| --- | --- |
| `demo@youtube.local` | `demo1234` |
| `amir@example.com` | `amir1234` |

В сиде также создаются каналы, игры, видео, комментарии, лайки, подписки, история и плейлисты.

### 3. Фронтенд (во втором терминале)

```bash
cd frontend
cp .env.example .env     # Windows: copy .env.example .env
bun install
bun run dev
```

Открыть `http://localhost:3000`.

## Остановка

```bash
# Ctrl+C в терминалах с dev-серверами
docker compose down        # остановить Postgres и Redis
# docker compose down -v   # + удалить данные БД (осторожно)
```

## Полезное

- Swagger API: `http://localhost:3001/swagger`
- Шаблоны настроек лежат в `Backend/.env.example` и `frontend/.env.example`. Скопируйте их в `.env` перед запуском — сами `.env` в git не коммитятся.
- ⚠️ `JWT_ACCESS_SECRET` и `JWT_REFRESH_SECRET` в `frontend/.env` и `Backend/.env` должны совпадать. Если они разные, защищённые страницы (`/studio`, `/my/*`) будут редиректить на `/auth`, даже когда вы залогинены.
- URL видео строится по `slug` (`/v/obzor-patcha-...`), а `publicId` остаётся внутренним идентификатором для плейлистов, комментариев и просмотров. Старые ссылки `/v/<publicId>` автоматически редиректят на slug.
- Загруженные файлы: `Backend/src/modules/file/uploads/` (создаётся автоматически).
- Если менялись Prisma-схемы: `cd Backend && bunx prisma migrate dev`.
- В `.env.example` стоят **тестовые ключи Google reCAPTCHA v2** — капча всегда проходит, это только для локальной разработки. Для продакшена замените их на реальные.
- Для регистрации с подтверждением email нужен SMTP (`MAIL_USER` / `MAIL_PASS`). Без него можно войти в демо-аккаунты после `bun run seed`.
- Пересоздать демо-данные: `cd Backend && bun run seed` (удаляет текущие данные из БД).
