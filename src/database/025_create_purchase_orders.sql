CREATE TABLE purchase_orders (

    id BIGSERIAL PRIMARY KEY,

    quotation_id BIGINT NOT NULL,

    institution_id BIGINT NOT NULL,

    supplier_id BIGINT NOT NULL,

    order_number VARCHAR(30) NOT NULL UNIQUE,

    status VARCHAR(30) NOT NULL DEFAULT 'DRAFT',

    currency CHAR(3) NOT NULL DEFAULT 'ARS',

    subtotal NUMERIC(15,2) NOT NULL DEFAULT 0,

    discount NUMERIC(15,2) NOT NULL DEFAULT 0,

    taxes NUMERIC(15,2) NOT NULL DEFAULT 0,

    shipping_cost NUMERIC(15,2) NOT NULL DEFAULT 0,

    total NUMERIC(15,2) NOT NULL DEFAULT 0,

    delivery_address_id BIGINT,

    expected_delivery_date DATE,

    payment_terms TEXT,

    notes TEXT,

    approved_at TIMESTAMP,

    delivered_at TIMESTAMP,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    deleted_at TIMESTAMP,


    CONSTRAINT fk_purchase_orders_quotation
        FOREIGN KEY (quotation_id)
        REFERENCES quotations(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,


    CONSTRAINT fk_purchase_orders_institution
        FOREIGN KEY (institution_id)
        REFERENCES institutions(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,


    CONSTRAINT fk_purchase_orders_supplier
        FOREIGN KEY (supplier_id)
        REFERENCES suppliers(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,


    CONSTRAINT fk_purchase_orders_address
        FOREIGN KEY (delivery_address_id)
        REFERENCES addresses(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,


    CONSTRAINT chk_purchase_order_status
        CHECK (
            status IN (
                'DRAFT',
                'PENDING_APPROVAL',
                'APPROVED',
                'SENT',
                'CONFIRMED',
                'IN_DELIVERY',
                'DELIVERED',
                'CANCELLED'
            )
        )

);


CREATE INDEX idx_purchase_orders_quotation
ON purchase_orders(quotation_id);


CREATE INDEX idx_purchase_orders_institution
ON purchase_orders(institution_id);


CREATE INDEX idx_purchase_orders_supplier
ON purchase_orders(supplier_id);


CREATE INDEX idx_purchase_orders_status
ON purchase_orders(status);


CREATE INDEX idx_purchase_orders_date
ON purchase_orders(created_at);