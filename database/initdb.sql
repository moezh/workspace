CREATE TABLE config (
    name VARCHAR(255) PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
);

INSERT INTO config (name, value)
VALUES 
('domain','com6.cc'),
('subdomain',''),
('github_url','https://github.com/moezh/workspace'),
('title','My Personal Workspace'),
('profile_photo_url','/profile_picture.png'),
('profile_name','Moez Hachicha'),
('profile_job_title','Senior Software Engineer & Tech Lead'),
('profile_location','Tunis, Tunisia'),
('profile_summary','Welcome to my personal workspace, where I showcase the side projects that I''m currently developing. As a senior software engineer and tech lead, with over 15 years in the industry, I possess a comprehensive understanding of both front-end and back-end technologies.'),
('contact_summary','Are you seeking professional assistance with rapid prototyping, application development, or digital product strategy? I am here to offer my expertise. I am available to communicate with you regarding any projects, ideas, or questions you may have. Please do not hesitate to reach out to me. You may contact me through email, message me on WhatsApp, connect with me on LinkedIn or schedule a Zoom meeting with me by clicking the buttons below. Rest assured that I will respond promptly to your inquiries. Thank you for considering my services.'),
('contact_email','moez.hachicha@icloud.com'),
('contact_whatapp','21655334476'),
('contact_linkedin_url','https://www.linkedin.com/in/moez-hachicha/'),
('contact_calendly_url','https://calendly.com/moezh/30min'),
('skills_title','Technologies I Master'),
('skills_summary','I am always keeping up with the latest developments in the field to ensure that I am using the most appropriate technology for each project. My expertise includes proficiency in a wide range of technologies, including but not limited to those listed below:'),
('skill_group1_title','Front-end'),
('skill_group1_summary','React Native,ReactJs,NextJs,TailwindCSS,Javascript,HTML/CSS'),
('skill_group2_title','Back-end'),
('skill_group2_summary','Typescript,NodeJs,ExpressJs,MySQL,PostgreSQL,RESTful APIs'),
('skill_group3_title','Infrastructure'),
('skill_group3_summary','Linux,Docker,AWS'),
('projects_title','Personal Side Projects'),
('projects_summary','Side projects allow me to experiment with new technologies and explore new ideas. The projects I am currently developing under this workspace are:'),
('projects','blog,store,web3,workout'),
('blog_summary','A platform where I share my knowledge and insights on various software engineering topics.'),
('store_summary','An affiliate store where I curate and feature a selection of products related to software engineering and technology.'),
('web3_summary','This side project showcases my ability to stay current with the latest technologies and trends related to web3, blockchain, and crypto.'),
('workout_summary','A mobile and web application that showcases my proficiency in creating high-performance applications using the latest technologies.');