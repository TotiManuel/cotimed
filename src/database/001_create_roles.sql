CREATE TABLE roles (

    id BIGSERIAL PRIMARY KEY,

    code VARCHAR(50) NOT NULL UNIQUE,

    name VARCHAR(100) NOT NULL,

    description TEXT,

    is_system BOOLEAN NOT NULL DEFAULT FALSE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW()

);

CREATE INDEX idx_roles_code
ON roles(code);

CREATE INDEX idx_roles_active
ON roles(is_active);

INSERT INTO roles
(code, name, description, is_system)
VALUES
(
    'ADMIN',
    'Administrador',
    'Control total del sistema',
    TRUE
),
(
    'EMPLOYEE',
    'Empleado',
    'Empleado perteneciente a una institución',
    TRUE
),
(
    'INSTITUTION',
    'Institución',
    'Hospital, clínica, sanatorio o laboratorio',
    TRUE
),
(
    'SUPPLIER',
    'Proveedor',
    'Proveedor de equipamiento médico',
    TRUE
);