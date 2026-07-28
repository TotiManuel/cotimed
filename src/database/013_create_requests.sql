CREATE TABLE requests (

    id BIGSERIAL PRIMARY KEY,

    institution_id BIGINT NOT NULL,

    requested_by BIGINT NOT NULL,

    request_number VARCHAR(30) NOT NULL UNIQUE,

    title VARCHAR(255) NOT NULL,

    description TEXT,

    status VARCHAR(30) NOT NULL DEFAULT 'DRAFT',

    priority VARCHAR(20) NOT NULL DEFAULT 'NORMAL',

    required_date DATE,

    quotation_deadline DATE,

    observations TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    deleted_at TIMESTAMP,

    CONSTRAINT fk_requests_institution
        FOREIGN KEY (institution_id)
        REFERENCES institutions(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_requests_requested_by
        FOREIGN KEY (requested_by)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT chk_request_status
        CHECK (
            status IN (
                'DRAFT',
                'PUBLISHED',
                'IN_REVIEW',
                'AWARDED',
                'CANCELLED',
                'CLOSED'
            )
        ),

    CONSTRAINT chk_request_priority
        CHECK (
            priority IN (
                'LOW',
                'NORMAL',
                'HIGH',
                'URGENT'
            )
        )

);

CREATE INDEX idx_requests_institution
ON requests(institution_id);

CREATE INDEX idx_requests_requested_by
ON requests(requested_by);

CREATE INDEX idx_requests_status
ON requests(status);

CREATE INDEX idx_requests_priority
ON requests(priority);

CREATE INDEX idx_requests_required_date
ON requests(required_date);

CREATE INDEX idx_requests_deadline
ON requests(quotation_deadline);