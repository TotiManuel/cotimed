CREATE TABLE equipment (

    id BIGSERIAL PRIMARY KEY,

    category_id BIGINT NOT NULL,

    code VARCHAR(50) NOT NULL UNIQUE,

    name VARCHAR(150) NOT NULL,

    description TEXT,

    useful_life_years INTEGER,

    requires_maintenance BOOLEAN NOT NULL DEFAULT TRUE,

    maintenance_interval_months INTEGER,

    risk_class VARCHAR(20),

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    deleted_at TIMESTAMP,

    CONSTRAINT fk_equipment_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT

);

CREATE INDEX idx_equipment_category
ON equipment(category_id);

CREATE INDEX idx_equipment_name
ON equipment(name);

CREATE INDEX idx_equipment_active
ON equipment(is_active);

INSERT INTO equipment
(category_id, code, name, useful_life_years, requires_maintenance)
VALUES

(1,'ECOGRAFO','Ecógrafo',10,TRUE),

(1,'ELECTROCARDIOGRAFO','Electrocardiógrafo',10,TRUE),

(1,'MONITOR_MULTIPARAMETRICO','Monitor Multiparamétrico',8,TRUE),

(2,'MESA_QUIRURGICA','Mesa Quirúrgica',15,TRUE),

(2,'LAMPARA_CIALITICA','Lámpara Cialítica',12,TRUE),

(3,'RESPIRADOR','Respirador',10,TRUE),

(3,'BOMBA_INFUSION','Bomba de Infusión',8,TRUE),

(4,'MICROSCOPIO','Microscopio',15,TRUE),

(4,'CENTRIFUGA','Centrífuga',10,TRUE),

(4,'ANALIZADOR_HEMATOLOGICO','Analizador Hematológico',10,TRUE);