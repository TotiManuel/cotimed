CREATE TABLE products (

    id BIGSERIAL PRIMARY KEY,

    equipment_id BIGINT NOT NULL,

    brand_id BIGINT NOT NULL,

    sku VARCHAR(100) NOT NULL UNIQUE,

    model VARCHAR(150) NOT NULL,

    commercial_name VARCHAR(255) NOT NULL,

    manufacturer_part_number VARCHAR(150),

    gtin VARCHAR(50),

    short_description TEXT,

    description TEXT,

    technical_specifications JSONB,

    warranty_months INTEGER,

    origin_country VARCHAR(100),

    image_url TEXT,

    datasheet_url TEXT,

    manual_url TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    deleted_at TIMESTAMP,

    CONSTRAINT fk_products_equipment
        FOREIGN KEY (equipment_id)
        REFERENCES equipment(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_products_brand
        FOREIGN KEY (brand_id)
        REFERENCES brands(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT

);

CREATE INDEX idx_products_equipment
ON products(equipment_id);

CREATE INDEX idx_products_brand
ON products(brand_id);

CREATE INDEX idx_products_model
ON products(model);

CREATE INDEX idx_products_name
ON products(commercial_name);

CREATE INDEX idx_products_active
ON products(is_active);