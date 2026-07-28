CREATE TABLE files (

    id BIGSERIAL PRIMARY KEY,

    uploaded_by BIGINT NOT NULL,

    entity_type VARCHAR(50) NOT NULL,

    entity_id BIGINT NOT NULL,

    file_name VARCHAR(255) NOT NULL,

    original_name VARCHAR(255) NOT NULL,

    file_extension VARCHAR(20) NOT NULL,

    mime_type VARCHAR(100) NOT NULL,

    file_size BIGINT NOT NULL,

    storage_path TEXT NOT NULL,

    is_public BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_files_uploaded_by
        FOREIGN KEY (uploaded_by)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT chk_files_entity_type
        CHECK (
            entity_type IN (
                'USER',
                'INSTITUTION',
                'SUPPLIER',
                'PRODUCT',
                'REQUEST',
                'QUOTATION'
            )
        )

);

CREATE INDEX idx_files_entity
ON files(entity_type, entity_id);

CREATE INDEX idx_files_uploaded_by
ON files(uploaded_by);

CREATE INDEX idx_files_public
ON files(is_public);