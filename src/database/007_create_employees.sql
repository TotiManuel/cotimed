CREATE TABLE employees (

    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    institution_id BIGINT,

    supplier_id BIGINT,

    employee_number VARCHAR(50),

    position VARCHAR(150),

    department VARCHAR(150),

    hire_date DATE,

    is_primary_contact BOOLEAN NOT NULL DEFAULT FALSE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    deleted_at TIMESTAMP,

    CONSTRAINT fk_employees_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_employees_institution
        FOREIGN KEY (institution_id)
        REFERENCES institutions(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_employees_supplier
        FOREIGN KEY (supplier_id)
        REFERENCES suppliers(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT chk_employee_entity
        CHECK (
            (institution_id IS NOT NULL AND supplier_id IS NULL)
            OR
            (institution_id IS NULL AND supplier_id IS NOT NULL)
        )

);

CREATE UNIQUE INDEX uq_employees_user
ON employees(user_id);

CREATE INDEX idx_employees_institution
ON employees(institution_id);

CREATE INDEX idx_employees_supplier
ON employees(supplier_id);

CREATE INDEX idx_employees_position
ON employees(position);

CREATE INDEX idx_employees_department
ON employees(department);

CREATE INDEX idx_employees_active
ON employees(is_active);