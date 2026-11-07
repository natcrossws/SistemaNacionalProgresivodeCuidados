-- 1. Tipos de Usuario
INSERT INTO "cat_tipo_usuario" ("id_cat_tipo_usuario", "tipo", "f_reg") VALUES
(1, 'GLOBAL_ADMIN', NOW()),
(2, 'INSTITUTION_ADMIN', NOW()),
(3, 'ADMIN', NOW()),
(4, 'USER', NOW());

-- 2. Institución Base
INSERT INTO "instituciones" ("id_institucion", "nombre", "slug", "configuracion_json", "activo", "f_reg") VALUES
(1, 'Sistema Nacional Progresivo de Cuidados', 'snpc', '{"theme":{"primaryColor":"#475569","secondaryColor":"#64748B","tertiaryColor":"#64748B","backgroundColor":"#F8FAFC","textColor":"#0F172A","mode":"light","loginTemplate":"default","loginPrimaryColor":"#475569","loginSecondaryColor":"#64748B","loginBackgroundColor":"#0F172A"}}', true, NOW());

-- 3. Usuario Administrador Global (pass: 123456)
INSERT INTO "usuarios" (
    id_usuario, nombre, email, telefono, hash_pass, fk_id_cat_tipo_usuario, activo, fk_id_institucion, f_reg, f_mod
) VALUES (
    1, 'Administrador Global', 'admin@snpc.gob.mx', '5551234567',
    '$2b$10$m9Y8klXsrWD7vcieHFQNSOVfR0iQDlRuTHIx4mHd0/OyVZNlFrNZq', -- '123456'
    1, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
);

-- 4. Rutas
INSERT INTO "rutas" ("id_ruta", "ruta", "vista_principal", "activo", "f_reg") VALUES
(1, '/admin', true, true, NOW()),
(2, '/admin/usuarios', false, true, NOW()),
(3, '/admin/configuracion', false, true, NOW()),
(4, '/admin/instituciones', false, true, NOW()),
(50, '/admin/design-system', false, true, NOW());

-- 5. Módulos
INSERT INTO "modulos" ("id_modulo", "titulo", "orden", "activo", "f_reg") VALUES
(1, 'Principal', 1, true, NOW()),
(2, 'Administración', 2, true, NOW()),
(3, 'Configuración', 3, true, NOW());

-- 6. Submódulos
INSERT INTO "submodulos" ("id_submodulo", "fk_id_modulo", "fk_id_ruta", "titulo", "descripcion", "orden", "activo") VALUES
(1, 1, 1, 'Dashboard', 'Panel Principal', 1, true),
(2, 2, 2, 'Gestión de Usuarios', 'Gestión de Usuarios', 1, true),
(3, 2, 3, 'Mi Perfil', 'Ajustes del perfil personal', 2, true),
(4, 3, 4, 'Instituciones', 'Gestión de Instituciones (Tenants)', 1, true),
(50, 3, 50, 'UI Showcase', 'Catálogo de componentes base', 10, true);

-- 7. Permisos de Usuario
INSERT INTO "rel_usuario_submodulo" ("fk_id_usuario", "fk_id_submodulo", "activo") VALUES
(1, 1, true),
(1, 2, true),
(1, 3, true),
(1, 4, true),
(1, 50, true);
