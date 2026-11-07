# Normalización y convenciones de base de datos

Este documento fija las reglas de modelado para PostgreSQL (y su reflejo en Prisma) en el SNPC: catálogos, claves, relaciones e índices. Objetivo: **menos redundancia**, **integridad referencial** y **estados expresados con catálogos**, no con cadenas libres en tablas operativas.

El producto es una **SPA** con API REST: el esquema de BD es la fuente de verdad compartida por todos los clientes. Convenciones de capa de aplicación en [GUIA_DESARROLLO.md](./GUIA_DESARROLLO.md).

---

## 1. Objetivos de la normalización (resumen)

- **1FN**: cada celda atómica; no repetir listas en un mismo campo.
- **2FN**: atributos no clave dependen de toda la clave (relevante en tablas con clave compuesta).
- **3FN**: atributos no clave no dependen de otros no clave (evitar derivados redundantes).

En la práctica del proyecto: entidades de negocio en tablas propias; valores de dominio cerrado en **catálogos**; relaciones N:M en tablas **`rel_*`**; integridad con **FK** y **índices** acordes a consultas y joins.

---

## 2. Catálogos: prefijo `cat_`

Las tablas que solo listan valores maestros del dominio se nombran con prefijo **`cat_`** en snake_case, en plural cuando describe el conjunto.

Ejemplos:

| Tabla | Propósito |
|-------|-----------|
| `cat_tipo_usuario` | Roles disponibles en el sistema |

Los catálogos suelen incluir:

- `codigo`: corto, estable, único (adecuado para lógica en aplicación y seeds).
- `nombre`: etiqueta para UI.
- `orden`: opcional, para desplegables.
- `activo`: opcional, para soft-disable sin borrar histórico.

---

## 3. Clave primaria en catálogos: `id_<tabla_en_singular>`

La PK sigue el patrón **`id_` + nombre lógico singular del catálogo**, coherente con el nombre de la tabla:

| Tabla | PK |
|-------|-----|
| `cat_tipo_usuario` | `id_cat_tipo_usuario` |

Tipo habitual: `SERIAL` / `INTEGER` con `PRIMARY KEY`, o `BIGSERIAL` si se espera volumen muy alto.

---

## 4. Claves foráneas: `fk_id_<referencia>`

Toda columna que referencia la PK de otra tabla se nombra:

**`fk_` + nombre de la columna PK referenciada** (es decir, `fk_` + `id_...`).

Ejemplos:

| Referencia | Columna FK en la tabla hija |
|------------|-----------------------------|
| `instituciones.id_institucion` | `fk_id_institucion` |
| `cat_tipo_usuario.id_cat_tipo_usuario` | `fk_id_cat_tipo_usuario` |

---

## 5. Estatus y tipos: catálogos, no cadenas sueltas

- **No** usar columnas como `estatus VARCHAR` con valores libres (`'activo'`, `'Activo'`, `'1'`) en tablas transaccionales si ese conjunto es cerrado.
- **Sí** usar `fk_id_cat_<nombre_catalogo>` apuntando a filas con `codigo` estable.

Ventajas: integridad, reportes consistentes, migraciones de datos más simples y una sola fuente de verdad para etiquetas en UI.

---

## 6. Tablas operativas (no catálogo)

- Nombre en **plural snake_case** del concepto: `usuarios`, `instituciones`.
- PK: `id_<singular_entidad>` → `id_usuario`, `id_institucion`.
- FK: patrón `fk_id_*` como arriba.

Relaciones muchos a muchos: prefijo **`rel_`** y nombre descriptivo, p. ej. `rel_usuario_submodulo`, con PK compuesta o `id_rel_...` según el diseño.

---

## 7. Índices

Crear índices (o constraints únicos) de forma explícita para:

1. **Todas las FK** usadas en filtros y joins frecuentes.
2. **Unicidad de negocio**: p. ej. `UNIQUE (codigo)` en catálogos; `UNIQUE (fk_id_a, fk_id_b)` en tablas `rel_*` cuando no debe repetirse el par.
3. **Consultas por tenant**: p. ej. `(fk_id_institucion, ...)` según patrones de acceso multi-institución.

---

## 8. Timestamps y auditoría

Convención del proyecto: columnas `f_reg` (alta) y `f_mod` (última modificación). En Prisma se reflejan con `@map` / nombres de campo alineados a la BD.

---

## 9. Prisma (alineación con la BD)

- `@@map("nombre_tabla")` / nombre del model alineado al nombre exacto en PostgreSQL.
- Campos en el schema con el mismo nombre de columna (`fk_id_*`, `f_reg`, `f_mod`).
- Relaciones con `@relation` usando las FKs **`fk_id_*`** tal cual existen en la BD.

---

## 10. Resumen rápido

| Elemento | Convención |
|----------|------------|
| Catálogo | `cat_<nombre>` |
| PK catálogo | `id_cat_<singular>` |
| PK entidad | `id_<singular>` |
| FK | `fk_id_<misma_forma_que_la_pk_referenciada>` |
| Estados / tipos cerrados | Tabla `cat_*` + FK; no strings mágicos |
| N:M | `rel_*` + PK/UNIQUE acorde |
| Integridad | `FOREIGN KEY`, tipos alineados, políticas ON DELETE/UPDATE conscientes |
| Rendimiento | Índices en FK y columnas de filtro frecuente |
