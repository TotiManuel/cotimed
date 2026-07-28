CREATE TABLE contacts (

    id BIGSERIAL PRIMARY KEY,

    institution_id BIGINT,

    supplier_id BIGINT,

    address_id BIGINT,

    first_name VARCHAR(100) NOT NULL,

    last_name VARCHAR(100) NOT NULL,

    position VARCHAR(150),

    department VARCHAR(150),

    email VARCHAR(255),

    phone VARCHAR(50),

    mobile_phone VARCHAR(50),

    is_primary BOOLEAN NOT NULL DEFAULT FALSE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    notes TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_contacts_institution
        FOREIGN KEY (institution_id)
        REFERENCES institutions(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_contacts_supplier
        FOREIGN KEY (supplier_id)
        REFERENCES suppliers(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_contacts_address
        FOREIGN KEY (address_id)
        REFERENCES addresses(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT chk_contacts_owner
        CHECK (
            (institution_id IS NOT NULL AND supplier_id IS NULL)
            OR
            (institution_id IS NULL AND supplier_id IS NOT NULL)
        )

);

CREATE INDEX idx_contacts_institution
ON contacts(institution_id);

CREATE INDEX idx_contacts_supplier
ON contacts(supplier_id);

CREATE INDEX idx_contacts_address
ON contacts(address_id);

CREATE INDEX idx_contacts_email
ON contacts(email);

CREATE INDEX idx_contacts_active
ON contacts(is_active);