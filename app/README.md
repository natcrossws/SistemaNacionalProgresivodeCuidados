# SNPC — Frontend & Backend

Sistema Nacional Progresivo de Cuidados: React + Vite + Chakra (frontend) y Express + Prisma + PostgreSQL (backend).

El código vive en `/app` como monorepo **pnpm workspaces**.

```text
SistemaNacionalProgresivodeCuidados/app/
├── backend/            # Express, Node.js, Prisma (PostgreSQL)
├── frontend/           # React 18, Vite, Chakra UI
├── package.json        # Workspace root (scripts pnpm)
├── pnpm-workspace.yaml
└── pnpm-lock.yaml
```

## Requisitos

- Node.js 20+
- pnpm 9+ (recomendado 11.1.1 vía Corepack)
- PostgreSQL

```bash
corepack enable
corepack prepare pnpm@11.1.1 --activate
```

## Instalación

```bash
cd app
pnpm install
```

Configura `.env` a partir de `.env.example`.

```bash
pnpm run db:migrate
# o, en desarrollo sin migraciones base:
# pnpm --filter snpc-backend exec prisma db push

psql "$DATABASE_URL" -f backend/prisma/seed_multitenant_catalogs.sql
psql -d db_snpc -f ../docs/seed_template_inicial.sql
```

## Desarrollo

Desde `app/`:

```bash
pnpm run dev              # backend + frontend en paralelo
pnpm run dev:backend
pnpm run dev:frontend
```

- API: `http://localhost:3001`
- UI: `https://localhost:5173`

**No uses `npm install` / `yarn`** — el lockfile canónico es `pnpm-lock.yaml`.

## Build / producción

```bash
pnpm run build:frontend   # → frontend/dist
pnpm run build:backend    # → backend/dist (tsc)
pnpm run start:backend
```

PM2 (ejemplo):

```bash
cd backend
pm2 start dist/server.js --name "snpc_api"
```

*Sistema Nacional Progresivo de Cuidados (SNPC)*
