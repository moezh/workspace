CREATE TABLE web3_config (
    name VARCHAR(255) PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
);

INSERT INTO web3_config (name, value)
VALUES 
('domain','com6.cc'),
('subdomain','web3');