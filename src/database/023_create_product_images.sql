CREATE TABLE product_images (

    id BIGSERIAL PRIMARY KEY,

    product_id BIGINT NOT NULL,

    file_id BIGINT NOT NULL,

    alt_text VARCHAR(255),

    display_order INTEGER NOT NULL DEFAULT 1,

    is_primary BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_product_images_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_product_images_file
        FOREIGN KEY (file_id)
        REFERENCES files(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE

);

CREATE INDEX idx_product_images_product
ON product_images(product_id);

CREATE INDEX idx_product_images_file
ON product_images(file_id);

CREATE INDEX idx_product_images_primary
ON product_images(is_primary);

CREATE INDEX idx_product_images_order
ON product_images(display_order);