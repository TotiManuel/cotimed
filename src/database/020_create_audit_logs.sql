CREATE TABLE audit_logs (

    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT,

    session_id BIGINT,

    action VARCHAR(50) NOT NULL,

    entity_type VARCHAR(50) NOT NULL,

    entity_id BIGINT NOT NULL,

    old_values JSONB,

    new_values JSONB,

    ip_address VARCHAR(45),

    user_agent TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_audit_logs_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_audit_logs_session
        FOREIGN KEY (session_id)
        REFERENCES user_sessions(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL

);

CREATE INDEX idx_audit_logs_user
ON audit_logs(user_id);

CREATE INDEX idx_audit_logs_session
ON audit_logs(session_id);

CREATE INDEX idx_audit_logs_entity
ON audit_logs(entity_type, entity_id);

CREATE INDEX idx_audit_logs_action
ON audit_logs(action);

CREATE INDEX idx_audit_logs_created
ON audit_logs(created_at);