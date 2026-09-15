# Резюме

Backend цифровой визитки на NestJS, GraphQL, Prisma и PostgreSQL.

## Запуск через Docker

```sh
docker compose up --build
```

После запуска Apollo Sandbox доступен по адресу <http://localhost:3000/graphql>.
Если порт `3000` занят, в PowerShell выполните `$env:APP_PORT=3001; docker compose up --build` и откройте порт `3001`.

## Локальный запуск

Нужны Bun и запущенный PostgreSQL. Скопируйте `.env.example` в `.env`, затем выполните:

```sh
bun install
bun run db:generate
bun run db:migrate -- --name init
bun run db:seed
bun run start:dev
```

Чтобы изменить данные визитки, отредактируйте `prisma/seed.ts` и повторите `bun run db:seed`.
