CREATE TABLE store_config (
    name VARCHAR(255) PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
);

INSERT INTO store_config (name, value)
VALUES 
('domain','com6.cc'),
('subdomain','store');