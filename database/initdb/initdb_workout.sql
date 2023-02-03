--DROP TABLE workout_config;

CREATE TABLE workout_config (
    name VARCHAR(255) PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
);

INSERT INTO workout_config (name, value)
VALUES 
('subdomain','workout'),
('workout_title','MH''s Workout'),
('workout_summary','An easy-to-use, short and effective home workout app to get toned, burn fat or build muscle in just a few minutes a day. All workouts are created based on your personal fitness profile to get you the best results. Just answer a few simple questions about your workout goal, intensity and frequency preferences, and you''ll have a fitness experience tailored just for you.'),
('bucket_url','https://objectstorage.eu-marseille-1.oraclecloud.com/n/axrso0xdipxv/b/bucket/o/workout');