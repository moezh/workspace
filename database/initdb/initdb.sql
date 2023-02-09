--DROP TABLE config;
--DROP TABLE users;

CREATE TABLE config (
    name VARCHAR(255) PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
);

INSERT INTO config (name, value)
VALUES 
('subdomain',''),
('github_url','https://github.com/moezh/workspace'),
('title','My Personal Workspace'),
('profile_photo_url','/profile_picture.png'),
('profile_name','Moez Hachicha'),
('profile_job_title','Software Engineering Consultant'),
('profile_location','Remote: Worldwide | On-site: Tunis, Tunisia'),
('profile_summary','Welcome to my personal workspace, where I showcase the side projects that I''m currently developing. As a software engineering consultant, with over 15 years in the industry, I possess a comprehensive understanding of both front-end and back-end technologies.'),
('contact_summary','I am available to communicate with you regarding any projects, ideas, or questions you may have. Please do not hesitate to reach out to me. You may contact me through email, message me on WhatsApp, connect with me on LinkedIn or schedule a Zoom meeting with me, by clicking the buttons below:'),
('contact_email','moez.hachicha@icloud.com'),
('contact_whatapp','21655334476'),
('contact_linkedin_url','https://www.linkedin.com/in/moez-hachicha/'),
('contact_calendly_url','https://calendly.com/moezh/30min'),
('skills_title','Technologies I Master'),
('skills_summary','I am always keeping up with the latest developments in the field to ensure that I am using the most appropriate technology for each project. My expertise includes proficiency in a wide range of technologies, including those listed below:'),
('skill_group1_title','Front-end'),
('skill_group1_summary','React Native,ReactJs,NextJs,TailwindCSS,Javascript,HTML/CSS'),
('skill_group2_title','Back-end'),
('skill_group2_summary','Typescript,NodeJs,ExpressJs,MySQL,PostgreSQL,RESTful APIs'),
('skill_group3_title','Infrastructure'),
('skill_group3_summary','Linux,Docker,AWS'),
('projects_title','Personal Side Projects'),
('projects_summary','Side projects allow me to experiment with new technologies and explore new ideas. The projects I am currently developing under this workspace are:'),
('projects','blog,store,workout,web3'),
('projects_under_construction','web3'),
('blog_summary','A blog where I share my knowledge and insights on technologies used in this workspace, providing search engine rankings for this workspace.'),
('store_summary','An automated affiliate store that curates items from top affiliate partners, simplifying my affiliate link promotion in one convenient platform.'),
('web3_summary','This side project showcases my ability to stay current with the latest technologies and trends related to web3, blockchain, and crypto.'),
('workout_summary','A mobile and web application that showcases my proficiency in creating high-performance applications using the latest technologies.');

CREATE TABLE users (
    email VARCHAR(100) PRIMARY KEY NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_data TEXT NOT NULL DEFAULT '{}'
);