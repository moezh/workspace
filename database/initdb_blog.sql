CREATE TABLE blog_config (
    name VARCHAR(255) PRIMARY KEY NOT NULL,
    value VARCHAR(255) NOT NULL
);

INSERT INTO blog_config (name, value)
VALUES 
('domain','com6.cc'),
('subdomain','blog');