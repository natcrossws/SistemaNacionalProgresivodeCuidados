# Base de datos — SNPC

El esquema de **Sistema Nacional Progresivo de Cuidados** se genera con Prisma a partir de `app/backend/prisma/schema.prisma`.

## Flujo de inicialización

1. **Creación de la base de datos**
   ```sql
   CREATE DATABASE db_snpc;
   ```

2. **Sincronización del esquema**
   Desde `app/backend/`:
   ```bash
   pnpm exec prisma db push
   ```
   (o `pnpm run db:migrate` cuando exista un historial de migraciones base).

3. **Datos iniciales (seed)**
   ```bash
   psql -U tu_usuario -d db_snpc -f docs/seed_template_inicial.sql
   psql -U tu_usuario -d db_snpc -f app/backend/prisma/seed_multitenant_catalogs.sql
   ```

## Directorio `database/`

Reservado para respaldos, migraciones SQL personalizadas o dumps locales de desarrollo.

## Normalización

Sigue la [Guía de Normalización de Base de Datos](../docs/guia_desarrollo/NORMALIZACION_BASE_DATOS.md) antes de añadir modelos nuevos.
