CREATE TABLE user_sessions (

    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    session_token TEXT NOT NULL UNIQUE,

    refresh_token TEXT UNIQUE,

    ip_address VARCHAR(45),

    user_agent TEXT,

    device_name VARCHAR(255),

    operating_system VARCHAR(100),

    browser VARCHAR(100),

    country VARCHAR(100),

    city VARCHAR(100),

    last_activity_at TIMESTAMP NOT NULL DEFAULT NOW(),

    expires_at TIMESTAMP NOT NULL,

    revoked_at TIMESTAMP,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_user_sessions_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE

);

CREATE INDEX idx_user_sessions_user
ON user_sessions(user_id);

CREATE INDEX idx_user_sessions_token
ON user_sessions(session_token);

CREATE INDEX idx_user_sessions_expires
ON user_sessions(expires_at);

CREATE INDEX idx_user_sessions_last_activity
ON user_sessions(last_activity_at);