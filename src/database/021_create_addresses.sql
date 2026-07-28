CREATE TABLE addresses (

    id BIGSERIAL PRIMARY KEY,

    institution_id BIGINT,

    supplier_id BIGINT,

    address_type VARCHAR(30) NOT NULL DEFAULT 'MAIN',

    name VARCHAR(150),

    street VARCHAR(255) NOT NULL,

    number VARCHAR(30),

    floor VARCHAR(20),

    apartment VARCHAR(20),

    city VARCHAR(100) NOT NULL,

    state VARCHAR(100),

    postal_code VARCHAR(20),

    country VARCHAR(100) NOT NULL DEFAULT 'Argentina',

    latitude DECIMAL(10,7),

    longitude DECIMAL(10,7),

    is_default BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_addresses_institution
        FOREIGN KEY (institution_id)
        REFERENCES institutions(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_addresses_supplier
        FOREIGN KEY (supplier_id)
        REFERENCES suppliers(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_addresses_owner
        CHECK (
            (institution_id IS NOT NULL AND supplier_id IS NULL)
            OR
            (institution_id IS NULL AND supplier_id IS NOT NULL)
        )

);

CREATE INDEX idx_addresses_institution
ON addresses(institution_id);

CREATE INDEX idx_addresses_supplier
ON addresses(supplier_id);