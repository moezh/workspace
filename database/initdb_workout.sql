CREATE TABLE workout_config (
    name VARCHAR(255) PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
);

INSERT INTO workout_config (name, value)
VALUES 
('subdomain','workout');