CREATE TABLE store_config (
    name VARCHAR(255) PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
);

INSERT INTO store_config (name, value)
VALUES 
('subdomain','store');