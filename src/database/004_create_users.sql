CREATE TABLE users (

    id BIGSERIAL PRIMARY KEY,

    role_id BIGINT NOT NULL,

    first_name VARCHAR(100) NOT NULL,

    last_name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    phone VARCHAR(50),

    password_hash TEXT NOT NULL,

    profile_photo TEXT,

    is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    is_blocked BOOLEAN NOT NULL DEFAULT FALSE,

    last_login TIMESTAMP,

    password_changed_at TIMESTAMP,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    deleted_at TIMESTAMP,

    CONSTRAINT fk_users_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT

);

CREATE INDEX idx_users_role
ON users(role_id);

CREATE INDEX idx_users_email
ON users(email);

CREATE INDEX idx_users_active
ON users(is_active);

CREATE INDEX idx_users_blocked
ON users(is_blocked);

CREATE INDEX idx_users_last_login
ON users(last_login);