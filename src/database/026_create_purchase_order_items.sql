CREATE TABLE purchase_order_items (

    id BIGSERIAL PRIMARY KEY,

    purchase_order_id BIGINT NOT NULL,

    quotation_item_id BIGINT NOT NULL,

    supplier_product_id BIGINT NOT NULL,

    quantity INTEGER NOT NULL,

    unit_price NUMERIC(15,2) NOT NULL,

    discount NUMERIC(15,2) NOT NULL DEFAULT 0,

    taxes NUMERIC(15,2) NOT NULL DEFAULT 0,

    subtotal NUMERIC(15,2) NOT NULL,

    delivery_status VARCHAR(30) NOT NULL DEFAULT 'PENDING',

    delivered_quantity INTEGER NOT NULL DEFAULT 0,

    notes TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),


    CONSTRAINT fk_purchase_order_items_order
        FOREIGN KEY (purchase_order_id)
        REFERENCES purchase_orders(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,


    CONSTRAINT fk_purchase_order_items_quotation
        FOREIGN KEY (quotation_item_id)
        REFERENCES quotation_items(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,


    CONSTRAINT fk_purchase_order_items_product
        FOREIGN KEY (supplier_product_id)
        REFERENCES supplier_products(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,


    CONSTRAINT chk_purchase_order_items_quantity
        CHECK (quantity > 0),


    CONSTRAINT chk_purchase_order_items_price
        CHECK (unit_price >= 0),


    CONSTRAINT chk_purchase_order_items_delivery
        CHECK (
            delivery_status IN (
                'PENDING',
                'PARTIAL',
                'DELIVERED',
                'CANCELLED'
            )
        )

);


CREATE INDEX idx_purchase_order_items_order
ON purchase_order_items(purchase_order_id);


CREATE INDEX idx_purchase_order_items_product
ON purchase_order_items(supplier_product_id);


CREATE INDEX idx_purchase_order_items_delivery
ON purchase_order_items(delivery_status);