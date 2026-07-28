CREATE TABLE categories (

    id BIGSERIAL PRIMARY KEY,

    parent_id BIGINT,

    code VARCHAR(50) NOT NULL UNIQUE,

    name VARCHAR(150) NOT NULL,

    description TEXT,

    icon VARCHAR(255),

    image VARCHAR(255),

    sort_order INTEGER NOT NULL DEFAULT 0,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    deleted_at TIMESTAMP,

    CONSTRAINT fk_categories_parent
        FOREIGN KEY (parent_id)
        REFERENCES categories(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT

);

CREATE INDEX idx_categories_parent
ON categories(parent_id);

CREATE INDEX idx_categories_name
ON categories(name);

CREATE INDEX idx_categories_active
ON categories(is_active);

CREATE INDEX idx_categories_sort
ON categories(sort_order);

INSERT INTO categories
(code, name)
VALUES

('DIAGNOSTICO','Diagnóstico'),

('QUIROFANO','Quirófano'),

('TERAPIA_INTENSIVA','Terapia Intensiva'),

('LABORATORIO','Laboratorio'),

('EMERGENCIAS','Emergencias'),

('REHABILITACION','Rehabilitación'),

('ODONTOLOGIA','Odontología'),

('MOBILIARIO','Mobiliario Hospitalario'),

('ESTERILIZACION','Esterilización'),

('CONSUMIBLES','Consumibles');