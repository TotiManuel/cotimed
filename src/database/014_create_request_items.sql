CREATE TABLE request_items (

    id BIGSERIAL PRIMARY KEY,

    request_id BIGINT NOT NULL,

    equipment_id BIGINT NOT NULL,

    quantity INTEGER NOT NULL,

    technical_requirements TEXT,

    preferred_brand_id BIGINT,

    maximum_budget NUMERIC(15,2),

    observations TEXT,

    item_order INTEGER NOT NULL DEFAULT 1,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_request_items_request
        FOREIGN KEY (request_id)
        REFERENCES requests(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_request_items_equipment
        FOREIGN KEY (equipment_id)
        REFERENCES equipment(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_request_items_brand
        FOREIGN KEY (preferred_brand_id)
        REFERENCES brands(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT chk_request_items_quantity
        CHECK (quantity > 0),

    CONSTRAINT chk_request_items_budget
        CHECK (
            maximum_budget IS NULL
            OR
            maximum_budget >= 0
        )

);

CREATE INDEX idx_request_items_request
ON request_items(request_id);

CREATE INDEX idx_request_items_equipment
ON request_items(equipment_id);

CREATE INDEX idx_request_items_brand
ON request_items(preferred_brand_id);