CREATE TABLE web3_config (
    name VARCHAR(255) PRIMARY KEY NOT NULL,
    value VARCHAR(255) NOT NULL
);

INSERT INTO web3_config (name, value)
VALUES 
('domain','com6.cc'),
('subdomain','web3'),
('logo_black','/logo_black.png'),
('logo_white','/logo_white.png');