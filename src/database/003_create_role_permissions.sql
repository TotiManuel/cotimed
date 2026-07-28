CREATE TABLE role_permissions (

    id BIGSERIAL PRIMARY KEY,

    role_id BIGINT NOT NULL,

    permission_id BIGINT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_role_permissions_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_role_permissions_permission
        FOREIGN KEY (permission_id)
        REFERENCES permissions(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT uq_role_permission
        UNIQUE(role_id, permission_id)

);

CREATE INDEX idx_role_permissions_role
ON role_permissions(role_id);

CREATE INDEX idx_role_permissions_permission
ON role_permissions(permission_id);

INSERT INTO role_permissions (role_id, permission_id)
SELECT
    1,
    id
FROM permissions;

INSERT INTO role_permissions (role_id, permission_id)

SELECT 2, id
FROM permissions
WHERE code IN (

'PRODUCTS_VIEW',

'REQUESTS_VIEW',
'REQUESTS_CREATE',
'REQUESTS_EDIT',

'QUOTATIONS_VIEW',

'DASHBOARD_VIEW'

);

INSERT INTO role_permissions (role_id, permission_id)

SELECT 3, id
FROM permissions
WHERE code IN (

'PRODUCTS_VIEW',

'REQUESTS_VIEW',
'REQUESTS_CREATE',
'REQUESTS_EDIT',
'REQUESTS_DELETE',

'QUOTATIONS_VIEW',

'DASHBOARD_VIEW',

'SETTINGS_VIEW'

);

INSERT INTO role_permissions (role_id, permission_id)

SELECT 4, id
FROM permissions
WHERE code IN (

'PRODUCTS_VIEW',
'PRODUCTS_CREATE',
'PRODUCTS_EDIT',

'QUOTATIONS_VIEW',
'QUOTATIONS_CREATE',
'QUOTATIONS_EDIT',

'DASHBOARD_VIEW',

'SETTINGS_VIEW'

);