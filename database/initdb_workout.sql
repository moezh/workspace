CREATE TABLE workout_config (
    name VARCHAR(255) PRIMARY KEY NOT NULL,
    value VARCHAR(255) NOT NULL
);

INSERT INTO workout_config (name, value)
VALUES 
('domain','com6.cc'),
('subdomain','workout');