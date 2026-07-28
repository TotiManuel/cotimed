CREATE TABLE permissions (

    id BIGSERIAL PRIMARY KEY,

    code VARCHAR(100) NOT NULL UNIQUE,

    name VARCHAR(150) NOT NULL,

    module VARCHAR(100) NOT NULL,

    description TEXT,

    is_system BOOLEAN NOT NULL DEFAULT TRUE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW()

);

CREATE INDEX idx_permissions_code
ON permissions(code);

CREATE INDEX idx_permissions_module
ON permissions(module);

CREATE INDEX idx_permissions_active
ON permissions(is_active);

INSERT INTO permissions (code, name, module, description) VALUES

-- Usuarios
('USERS_VIEW', 'Ver usuarios', 'USERS', 'Permite visualizar usuarios'),
('USERS_CREATE', 'Crear usuarios', 'USERS', 'Permite crear usuarios'),
('USERS_EDIT', 'Editar usuarios', 'USERS', 'Permite modificar usuarios'),
('USERS_DELETE', 'Eliminar usuarios', 'USERS', 'Permite eliminar usuarios'),

-- Roles
('ROLES_VIEW', 'Ver roles', 'ROLES', 'Permite visualizar roles'),
('ROLES_CREATE', 'Crear roles', 'ROLES', 'Permite crear roles'),
('ROLES_EDIT', 'Editar roles', 'ROLES', 'Permite modificar roles'),
('ROLES_DELETE', 'Eliminar roles', 'ROLES', 'Permite eliminar roles'),

-- Productos
('PRODUCTS_VIEW', 'Ver productos', 'PRODUCTS', 'Permite visualizar productos'),
('PRODUCTS_CREATE', 'Crear productos', 'PRODUCTS', 'Permite crear productos'),
('PRODUCTS_EDIT', 'Editar productos', 'PRODUCTS', 'Permite modificar productos'),
('PRODUCTS_DELETE', 'Eliminar productos', 'PRODUCTS', 'Permite eliminar productos'),

-- Solicitudes
('REQUESTS_VIEW', 'Ver solicitudes', 'REQUESTS', 'Permite visualizar solicitudes'),
('REQUESTS_CREATE', 'Crear solicitudes', 'REQUESTS', 'Permite crear solicitudes'),
('REQUESTS_EDIT', 'Editar solicitudes', 'REQUESTS', 'Permite modificar solicitudes'),
('REQUESTS_DELETE', 'Eliminar solicitudes', 'REQUESTS', 'Permite eliminar solicitudes'),

-- Cotizaciones
('QUOTATIONS_VIEW', 'Ver cotizaciones', 'QUOTATIONS', 'Permite visualizar cotizaciones'),
('QUOTATIONS_CREATE', 'Crear cotizaciones', 'QUOTATIONS', 'Permite crear cotizaciones'),
('QUOTATIONS_EDIT', 'Editar cotizaciones', 'QUOTATIONS', 'Permite modificar cotizaciones'),
('QUOTATIONS_DELETE', 'Eliminar cotizaciones', 'QUOTATIONS', 'Permite eliminar cotizaciones'),

-- Dashboard
('DASHBOARD_VIEW', 'Ver dashboard', 'DASHBOARD', 'Permite acceder al dashboard'),

-- Reportes
('REPORTS_VIEW', 'Ver reportes', 'REPORTS', 'Permite acceder a reportes'),

-- Configuración
('SETTINGS_VIEW', 'Ver configuración', 'SETTINGS', 'Permite acceder a configuración'),
('SETTINGS_EDIT', 'Modificar configuración', 'SETTINGS', 'Permite modificar la configuración'),

-- Logs
('LOGS_VIEW', 'Ver logs', 'LOGS', 'Permite consultar los registros del sistema');