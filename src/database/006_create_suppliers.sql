CREATE TABLE suppliers (

    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(255) NOT NULL,

    legal_name VARCHAR(255),

    tax_id VARCHAR(30) UNIQUE,

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

    years_experience INTEGER,

    technical_service BOOLEAN NOT NULL DEFAULT FALSE,

    nationwide_shipping BOOLEAN NOT NULL DEFAULT FALSE,

    international_shipping BOOLEAN NOT NULL DEFAULT FALSE,

    is_verified BOOLEAN NOT NULL DEFAULT FALSE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    deleted_at TIMESTAMP

);

CREATE INDEX idx_suppliers_name
ON suppliers(name);

CREATE INDEX idx_suppliers_tax_id
ON suppliers(tax_id);

CREATE INDEX idx_suppliers_city
ON suppliers(city);

CREATE INDEX idx_suppliers_active
ON suppliers(is_active);

CREATE INDEX idx_suppliers_verified
ON suppliers(is_verified);