CREATE TABLE quotations (

    id BIGSERIAL PRIMARY KEY,

    request_id BIGINT NOT NULL,

    supplier_id BIGINT NOT NULL,

    quotation_number VARCHAR(30) NOT NULL UNIQUE,

    status VARCHAR(30) NOT NULL DEFAULT 'DRAFT',

    currency CHAR(3) NOT NULL DEFAULT 'ARS',

    subtotal NUMERIC(15,2) NOT NULL DEFAULT 0,

    discount NUMERIC(15,2) NOT NULL DEFAULT 0,

    taxes NUMERIC(15,2) NOT NULL DEFAULT 0,

    shipping_cost NUMERIC(15,2) NOT NULL DEFAULT 0,

    total NUMERIC(15,2) NOT NULL DEFAULT 0,

    estimated_delivery_days INTEGER,

    payment_terms TEXT,

    valid_until DATE NOT NULL,

    observations TEXT,

    submitted_at TIMESTAMP,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    deleted_at TIMESTAMP,

    CONSTRAINT fk_quotations_request
        FOREIGN KEY (request_id)
        REFERENCES requests(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_quotations_supplier
        FOREIGN KEY (supplier_id)
        REFERENCES suppliers(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT chk_quotation_status
        CHECK (
            status IN (
                'DRAFT',
                'SUBMITTED',
                'UNDER_REVIEW',
                'ACCEPTED',
                'REJECTED',
                'EXPIRED',
                'CANCELLED'
            )
        )

);

CREATE INDEX idx_quotations_request
ON quotations(request_id);

CREATE INDEX idx_quotations_supplier
ON quotations(supplier_id);

CREATE INDEX idx_quotations_status
ON quotations(status);

CREATE INDEX idx_quotations_valid_until
ON quotations(valid_until);