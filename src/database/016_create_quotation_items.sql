CREATE TABLE quotation_items (

    id BIGSERIAL PRIMARY KEY,

    quotation_id BIGINT NOT NULL,

    request_item_id BIGINT NOT NULL,

    supplier_product_id BIGINT NOT NULL,

    quantity INTEGER NOT NULL,

    unit_price NUMERIC(15,2) NOT NULL,

    discount NUMERIC(15,2) NOT NULL DEFAULT 0,

    taxes NUMERIC(15,2) NOT NULL DEFAULT 0,

    subtotal NUMERIC(15,2) NOT NULL,

    warranty_months INTEGER,

    delivery_time_days INTEGER,

    observations TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_quotation_items_quotation
        FOREIGN KEY (quotation_id)
        REFERENCES quotations(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_quotation_items_request_item
        FOREIGN KEY (request_item_id)
        REFERENCES request_items(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_quotation_items_supplier_product
        FOREIGN KEY (supplier_product_id)
        REFERENCES supplier_products(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT chk_quotation_items_quantity
        CHECK (quantity > 0),

    CONSTRAINT chk_quotation_items_unit_price
        CHECK (unit_price >= 0),

    CONSTRAINT chk_quotation_items_discount
        CHECK (discount >= 0),

    CONSTRAINT chk_quotation_items_taxes
        CHECK (taxes >= 0),

    CONSTRAINT chk_quotation_items_subtotal
        CHECK (subtotal >= 0)

);

CREATE INDEX idx_quotation_items_quotation
ON quotation_items(quotation_id);

CREATE INDEX idx_quotation_items_request_item
ON quotation_items(request_item_id);

CREATE INDEX idx_quotation_items_supplier_product
ON quotation_items(supplier_product_id);