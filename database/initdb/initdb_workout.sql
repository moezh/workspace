--DROP TABLE workout_config;

CREATE TABLE workout_config (
    name VARCHAR(255) PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
);

INSERT INTO workout_config (name, value)
VALUES 
('subdomain','workout'),
('workout_title','MH''s Workout'),
('bucket_url','https://objectstorage.eu-marseille-1.oraclecloud.com/n/axrso0xdipxv/b/bucket/o/workout');