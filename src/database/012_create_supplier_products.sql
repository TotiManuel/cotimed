CREATE TABLE supplier_products (

    id BIGSERIAL PRIMARY KEY,

    supplier_id BIGINT NOT NULL,

    product_id BIGINT NOT NULL,

    supplier_sku VARCHAR(100),

    supplier_product_name VARCHAR(255),

    purchase_price NUMERIC(15,2),

    sale_price NUMERIC(15,2) NOT NULL,

    currency CHAR(3) NOT NULL DEFAULT 'ARS',

    stock_quantity INTEGER NOT NULL DEFAULT 0,

    minimum_stock INTEGER DEFAULT 0,

    delivery_time_days INTEGER,

    warranty_months INTEGER,

    is_featured BOOLEAN NOT NULL DEFAULT FALSE,

    is_available BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    deleted_at TIMESTAMP,

    CONSTRAINT fk_supplier_products_supplier
        FOREIGN KEY (supplier_id)
        REFERENCES suppliers(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_supplier_products_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT uq_supplier_product
        UNIQUE (supplier_id, product_id)

);

CREATE INDEX idx_supplier_products_supplier
ON supplier_products(supplier_id);

CREATE INDEX idx_supplier_products_product
ON supplier_products(product_id);

CREATE INDEX idx_supplier_products_available
ON supplier_products(is_available);

CREATE INDEX idx_supplier_products_price
ON supplier_products(sale_price);

CREATE INDEX idx_supplier_products_stock
ON supplier_products(stock_quantity);