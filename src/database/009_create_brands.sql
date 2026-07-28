CREATE TABLE brands (

    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL UNIQUE,

    legal_name VARCHAR(255),

    description TEXT,

    logo VARCHAR(255),

    website VARCHAR(255),

    email VARCHAR(255),

    phone VARCHAR(50),

    country VARCHAR(100),

    is_verified BOOLEAN NOT NULL DEFAULT FALSE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    deleted_at TIMESTAMP

);

CREATE INDEX idx_brands_name
ON brands(name);

CREATE INDEX idx_brands_country
ON brands(country);

CREATE INDEX idx_brands_active
ON brands(is_active);

CREATE INDEX idx_brands_verified
ON brands(is_verified);

INSERT INTO brands
(name, country, website, is_verified)
VALUES

('Philips', 'Países Bajos', 'https://www.philips.com', TRUE),

('GE HealthCare', 'Estados Unidos', 'https://www.gehealthcare.com', TRUE),

('Siemens Healthineers', 'Alemania', 'https://www.siemens-healthineers.com', TRUE),

('Mindray', 'China', 'https://www.mindray.com', TRUE),

('Dräger', 'Alemania', 'https://www.draeger.com', TRUE),

('B. Braun', 'Alemania', 'https://www.bbraun.com', TRUE),

('Medtronic', 'Irlanda', 'https://www.medtronic.com', TRUE),

('Nihon Kohden', 'Japón', 'https://www.nihonkohden.com', TRUE),

('Olympus', 'Japón', 'https://www.olympus-global.com', TRUE),

('Welch Allyn', 'Estados Unidos', 'https://www.welchallyn.com', TRUE);