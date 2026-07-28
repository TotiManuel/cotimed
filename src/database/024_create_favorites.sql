CREATE TABLE favorites (

    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    entity_type VARCHAR(50) NOT NULL,

    entity_id BIGINT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_favorites_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT chk_favorites_entity_type
        CHECK (
            entity_type IN (
                'PRODUCT',
                'SUPPLIER',
                'BRAND',
                'CATEGORY',
                'EQUIPMENT'
            )
        ),

    CONSTRAINT uq_user_favorite
        UNIQUE (
            user_id,
            entity_type,
            entity_id
        )

);

CREATE INDEX idx_favorites_user
ON favorites(user_id);

CREATE INDEX idx_favorites_entity
ON favorites(entity_type, entity_id);