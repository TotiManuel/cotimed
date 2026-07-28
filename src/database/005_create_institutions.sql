CREATE TABLE institutions (

    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(255) NOT NULL,

    legal_name VARCHAR(255),

    tax_id VARCHAR(30) UNIQUE,

    institution_type VARCHAR(50) NOT NULL,

    email VARCHAR(255),

    phone VARCHAR(50),

    website VARCHAR(255),

    address VARCHAR(255),

    city VARCHAR(100),

    state VARCHAR(100),

    postal_code VARCHAR(20),

    country VARCHAR(100) NOT NULL DEFAULT 'Argentina',

    description TEXT,

    logo TEXT,

    is_verified BOOLEAN NOT NULL DEFAULT FALSE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    deleted_at TIMESTAMP

);

CREATE INDEX idx_institutions_name
ON institutions(name);

CREATE INDEX idx_institutions_tax_id
ON institutions(tax_id);

CREATE INDEX idx_institutions_type
ON institutions(institution_type);

CREATE INDEX idx_institutions_city
ON institutions(city);

CREATE INDEX idx_institutions_active
ON institutions(is_active);