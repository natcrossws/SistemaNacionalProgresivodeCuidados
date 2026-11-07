# Guía de Desarrollo Técnica — Sistema Nacional Progresivo de Cuidados (SNPC)

Esta documentación es la **fuente de verdad** sobre la arquitectura, tecnologías y estándares de desarrollo del SNPC. Refleja el estado actual (TypeScript, Prisma, React, Chakra UI) y establece las reglas para la creación de nuevos módulos, pantallas y endpoints.

---

## 1. Stack Tecnológico

El proyecto está dividido en dos aplicaciones (Frontend y Backend) fuertemente tipadas usando **TypeScript**.

### Frontend (SPA)
* **Core:** React 18, Vite, TypeScript.
* **UI & Estilos:** Chakra UI (v2) como base principal, Emotion para animaciones (`keyframes`), y CSS puro (`index.css`) para variables dinámicas y resets.
* **Enrutamiento:** React Router v6.
* **Gestión de Peticiones:** Axios (configurado en `api.ts`).
* **Iconografía:** `react-icons` (principalmente colecciones `Bi` e `Fi`).

### Backend (API REST)
* **Core:** Node.js, Express, TypeScript.
* **Base de Datos & ORM:** PostgreSQL administrado a través de **Prisma ORM**.
* **Autenticación:** JWT para sesiones, `bcryptjs` para cifrado de contraseñas, e integración de `@simplewebauthn/server` para Passkeys/Autenticación Biométrica.
* **Archivos:** Multer para carga en memoria (`uploadMemory`), persistencia configurable hacia R2/S3.

---

## 2. Arquitectura y Modularización

Tanto el backend como el frontend siguen un patrón arquitectónico **Modular por Dominio**. En lugar de separar por tipo de archivo a nivel global (todas las rutas juntas, todos los controladores juntos), agrupamos por **Módulo Lógico**.

### 2.1 Backend (`app/backend/`)
```text
app/backend/
├── app.ts                  # Punto de entrada, middlewares globales y montaje estático
├── core/
│   ├── db/                 # Cliente de BD singleton (prisma.ts)
│   └── config/             # Configuración y variables de entorno
├── modules/                # MÓDULOS DE DOMINIO (Negocio)
│   ├── auth/               # controllers/, routes/
│   ├── general/            # dashboard, endpoints transversales (upload genérico)
│   └── gestion/            # lógica CRUD y reglas (usuarios, instituciones, catálogos)
├── shared/                 # COMPARTIDO (Reutilizable en todo el Backend)
│   ├── middlewares/        # authMiddleware, uploadConfig, parseNestedFormData
│   ├── services/           # Lógica compleja de terceros (WebAuthn, Almacenamiento R2)
│   ├── utils/              # Funciones auxiliares genéricas (parsers, validators)
│   └── observability/      # Logs, healthchecks y correlación de peticiones
└── prisma/                 # schema.prisma
```
* **Regla de creación:** Todo nuevo dominio de negocio debe crear su propia carpeta en `modules/<dominio>/` con sus propios `controllers/` y `routes/`. Estas rutas se exponen agregándolas a `routes/apiRoutes.ts`.

### 2.2 Frontend (`app/frontend/`)
```text
app/frontend/src/
├── App.tsx                 # Enrutador principal de React Router y layouts base
├── core/
│   ├── context/            # Estados globales: AuthContext, InstitutionContext
│   └── theme/              # dynamicTheme.ts, documentThemeColor.ts
├── modules/                # MÓDULOS DE DOMINIO (Vistas completas)
│   ├── auth/               # Login, Passkeys, LoginTemplates/
│   ├── configuracion/      # Apariencia (Módulo dinámico de UI) y Design System
│   └── gestion/            # Vistas de negocio, Usuarios, Catálogos
├── shared/                 # COMPARTIDO (Componentes UI y Lógica Genérica)
│   ├── components/         # Layouts, Modales, Tablas, Formularios
│   ├── services/           # api.ts (Axios interceptors)
│   └── utils/              # Helpers de renderizado, validación y localStorage
└── assets/                 # Imágenes y recursos estáticos
```
* **Regla de creación:** Una nueva pantalla pertenece a un módulo lógico dentro de `src/modules/<NombreModulo>/pages/`. **Todo componente que sea susceptible a usarse en más de una pantalla (modales, tablas, secciones de filtros) DEBE ir a `src/shared/components/`**.

---

## 3. Componentes Compartidos (Frontend)

Para garantizar consistencia visual y la mantenibilidad de la "Marca Blanca", se prohíbe crear componentes UI básicos aislados en cada página.

* **Layouts (`shared/components/layout/`):** Aquí reside la estructura (`Layout.tsx`, `Sidebar.tsx`, navbars de login).
* **Contenedores de Datos:** Elementos estructurales como tarjetas estilo cristal, contenedores de filtros, modales de éxito/error, y tablas de datos deben crearse en `shared/components/` recibiendo "props" (ej. `children`, `columns`, `data`) para inyectarles contenido.
* **Componentización:** En lugar de maquetar HTML desde cero, reutiliza la extensa librería de Chakra UI.

---

## 4. Diseño, Template Visual y Apariencia Dinámica

El sistema está diseñado para ser completamente personalizable (**Marca Blanca**), por lo que colores, logotipos y plantillas base están inyectados en tiempo real.

### 4.1 La Fuente de la Verdad (Design System Template)
Existe una vista plantilla interactiva en:
> **`app/frontend/src/modules/configuracion/pages/DesignSystemPage.tsx`**

**IMPORTANTE:** Para crear nuevas pantallas, el desarrollador **debe** entrar a la ruta del Design System (ej. `/admin/configuracion/design-system` o la ruta registrada) y usarla como plantilla técnica y visual. De ahí se debe extraer la estructura para GlassCards, botones primarios, tablas, formularios y modales. Esto asegura homogeneidad en todo el sistema.

### 4.2 Sistema Dinámico de Color (`InstitutionContext` + `dynamicTheme.ts`)
1. El usuario administrador cambia la paleta desde el módulo **Apariencia** (`/admin/apariencia`).
2. Esto guarda la configuración JSON (`configuracion_json.apariencia`) en BD.
3. El `InstitutionContext` descarga estos datos de la BD o memoria y ejecuta `applyDynamicTheme()`.
4. El script inyecta **variables nativas de CSS** en la etiqueta `<html>`, como `--brand-rgb`, `--secondary-rgb`.
5. **Cómo estilizar en los componentes:**
   ```tsx
   // CORRECTO (Soporta transparencia y mantiene el color corporativo actual)
   <Box bg="rgba(var(--brand-rgb), 0.1)" backdropFilter="blur(10px)">
   
   // CORRECTO (Usa los tokens sobreescritos de Chakra UI)
   <Button colorScheme="brand">Guardar</Button>
   
   // INCORRECTO (Color hexadecimal fijo que romperá la marca blanca)
   <Box bg="#007B55">
   ```

---

## 5. Backend: Middlewares Principales

Todo nuevo endpoint debe procesarse y asegurarse mediante la suite de Middlewares (`app/backend/shared/middlewares/`).

* **`protect` (Auth):** Valida el JWT y firma digital, asignando el usuario autenticado a `req.user`.
* **`restrictTo(...roles)`:** Control de acceso basado en rol (RBAC). Ej: `restrictTo('ADMIN', 'INSTITUTION_ADMIN')`.
* **`validateInstitution`:** Analiza la cabecera `x-institution-id`. Garantiza que el usuario está autorizado para alterar datos de dicha institución, y provee `req.institutionId`.
* **`uploadMemory`:** Middleware de Multer que carga archivos directamente en **memoria (Buffer)**. Excelente para implementaciones modernas de subida (como FilePond) que devuelven Base64 rápido o redirigen el buffer hacia buckets externos (S3/R2) sin llenar el disco del servidor.
* **`parseNestedFormData`:** Cuando se reciben peticiones `multipart/form-data` (porque hay un archivo adjunto), los datos anidados llegan como strings o arrays de strings. Este middleware regenera el objeto complejo original para que el controlador lo reciba como un JSON estructurado.

Ejemplo de definición de ruta moderna:
```typescript
router.post(
  '/usuarios',
  protect,
  restrictTo('ADMIN', 'INSTITUTION_ADMIN'),
  uploadMemory.single('foto'),  // Se captura el archivo en RAM
  parseNestedFormData,          // Se limpian los datos JSON adjuntos
  usuarioController.create      // Controlador tipado
);
```

---

## 6. Base de Datos (Prisma)

El proyecto opera enteramente con **Prisma ORM**.
1. **Schema:** Toda la definición de tablas y relaciones está unificada en `app/backend/prisma/schema.prisma`.
2. **Cliente Singleton:** No importes PrismaClient en todas partes; usa el cliente exportado desde `core/db/prisma.ts`.
3. **Tipado Automático:** Prisma deduce y provee las interfaces TypeScript para cada tabla, evitando escribir manualmente tipos para las operaciones de base de datos.
4. **Workflow de Actualización:** Si la BD cambia directamente (ej. por scripts SQL), ejecuta:
   ```bash
   npx prisma db pull
   npx prisma generate
   ```
   Si vas a definir un cambio desde el archivo `.prisma`, ejecuta:
   ```bash
   npx prisma migrate dev
   ```

---

## 7. Validaciones de Seguridad y Datos (Doble Capa)

Es de carácter **obligatorio** implementar validaciones de datos, formatos y reglas de negocio en **ambas capas** de la aplicación (Frontend y Backend). No se permite delegar la responsabilidad de validación a una sola capa.

1. **Validación en Frontend (Experiencia de Usuario):** 
   Se deben implementar validaciones visuales y preventivas en los formularios de React (campos requeridos, límites de caracteres, coincidencia de contraseñas, etc.). Esto sirve para dar retroalimentación inmediata al usuario y evitar enviar peticiones malformadas al servidor.

2. **Validación en Backend (Seguridad Estricta - Fuente de Verdad):** 
   NUNCA se debe confiar únicamente en las validaciones o en el HTML generado por el frontend. Un usuario malintencionado puede utilizar las "DevTools" (inspector del navegador) para eliminar atributos `required`, modificar `<select>`, inyectar código, o simplemente eludir el frontend haciendo peticiones directas vía Postman/cURL. 
   
   Por ello, **todo controlador de Backend debe verificar:**
   * La existencia y el tipo de los datos recibidos en el payload (ej. validaciones de esquema con Zod, Joi, o validadores nativos).
   * Límites de longitud y formato seguro (evitar inyecciones SQL/NoSQL).
   * Restricciones de integridad (ej. si un `id` proporcionado realmente existe en la base de datos y pertenece a la institución actual).
