# Sistema Nacional Progresivo de Cuidados (SNPC)

Aplicación de gestión para el **Sistema Nacional Progresivo de Cuidados**, construida con Node.js (Express + TypeScript), Prisma ORM (PostgreSQL) y Vite (React + Chakra UI). Incluye autenticación, multitenancy por institución y control de accesos (RBAC).

## Características principales

1. **Autenticación**: Passkeys (WebAuthn) y email/contraseña con JWT.
2. **Multitenancy**: entidad `Institucion`; cada usuario pertenece a una institución (o tiene rol global).
3. **RBAC**: permisos por `Modulo` → `Submodulo` → `RelUsuarioSubmodulo`.
4. **Arquitectura modular**: backend tipado (`/app/backend/modules/`) y frontend por módulos (`/app/frontend/src/modules/`).

## Estructura del repositorio

### `app/`
- **`app/backend/`**: API REST (Express, TypeScript, Prisma).
- **`app/frontend/`**: SPA (React + Vite + TypeScript).

### `docs/`
- [`seed_template_inicial.sql`](./seed_template_inicial.sql) — datos mínimos (catálogos, institución base, admin global y módulos).
- [`guia_desarrollo/`](./guia_desarrollo/) — guías técnicas y de normalización de BD.

## Instalación y arranque rápido

1. Clona el repositorio. Requiere PostgreSQL y Node.js 20+.
2. Crea la base de datos (p. ej. `db_snpc`).
3. Configura `app/.env` a partir de `app/.env.example`.
4. Desde `app/`:
   ```bash
   pnpm install
   pnpm exec prisma db push --schema backend/prisma/schema.prisma
   psql -d db_snpc -f ../docs/seed_template_inicial.sql
   pnpm run dev
   ```
5. Backend: `http://localhost:3001` · Frontend: `https://localhost:5173`
6. Credenciales iniciales: `admin@snpc.gob.mx` / `123456`
