CREATE TABLE blog_config (
    name VARCHAR(255) PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
);

INSERT INTO blog_config (name, value)
VALUES 
('subdomain','blog'),
('tags','typescript,nodejs,expressjs,nextjs,tailwindcss,postgresql,docker');

CREATE TABLE blog_posts (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    tags VARCHAR(255) NOT NULL,
    summary VARCHAR(1000) NOT NULL,
    content_html TEXT NOT NULL
);

INSERT INTO blog_posts (id, title, tags, summary, content_html)
VALUES 
('nodejs-typecript-and-nodemon','Set up Server-side Applications with Node.js, TypeScript and Nodemon', 'nodejs,typescript', 'In this blog post, we discuss how to configure Node.js and TypeScript to work together, and how to use the nodemon tool to automatically restart the server when code changes. We provide step-by-step instructions and code examples to help developers set up a new Node.js and TypeScript project, configure the TypeScript compiler, and use nodemon to streamline the development workflow.', '<p>Node.js and TypeScript are both powerful tools for building server-side applications, but when used together, they can offer an even more powerful and efficient development experience. In this post, we will explore how to set up a Node.js and TypeScript project, and how to use the nodemon tool to automatically restart the server when code changes.</p><br/><p>First, let''s start by setting up a new Node.js project. Create a new directory for your project, then initialize it using npm:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ mkdir my-project<br>$ cd my-project<br>$ npm init -y</div><br><p>This command will create a new package.json file in your project directory.</p><br/><p>Next, let''s install TypeScript as a development dependency:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ npm install --save-dev typescript</div><br><p>Now, let''s create a new TypeScript configuration file called "tsconfig.json" in the root of your project:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ npx tsc --init</div><br><p>This command will create a new "tsconfig.json" file in your project directory, which is used to configure the TypeScript compiler.</p><br/><p>Next, let''s install the necessary dependencies to run a Node.js server with TypeScript:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ npm install --save @types/node express</div><br><p>Now, let''s create a new directory called "src" in the root of your project, and create a new file called "index.ts" inside of it:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ mkdir src<br>$ touch src/index.ts</div><br><p>This file will be the entry point for your application.</p><br/><p>Now let''s move to the configuration of nodemon, to do this we need to install it as a development dependency:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ npm install --save-dev nodemon</div><br><p>Once we have it installed, we can create a new script in the package.json file:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">"scripts": {<br>&nbsp;&nbsp;&nbsp;"start": "nodemon --exec ts-node src/index.ts",<br>&nbsp;&nbsp;&nbsp;"build": "tsc"<br>},</div><br><p>With this script, every time we make a change in the code, nodemon will automatically restart the server, executing the TypeScript files using ts-node.</p><br/><p>Now we can start our server by running:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ npm start</div><br><p>In summary, by configuring Node.js and TypeScript together, we can take advantage of the powerful features of both technologies to build efficient and scalable server-side applications. Using nodemon, we can streamline our development workflow by automatically restarting the server when code changes. This tutorial provides a basic example of how to set up a Node.js and TypeScript project and use nodemon, but there are many other tools and configurations available to explore.</p><br/><p>It is important to mention that in this example we are using ts-node to run the typescript code, it is an alternative to the common practice of transpile the code to javascript and then run the javascript.</p>'),
('nodejs-postgresql-typescript','Set up Server-side Applications with Node.js, PostgreSQL and TypeScript', 'nodejs,postgresql, typescript', 'This blog post explores how to set up a Node.js and PostgreSQL project and configure them to work together using TypeScript. It provides step-by-step instructions and code examples to create a connection to a PostgreSQL database and execute SQL statements from a Node.js application using TypeScript. Additionally, it also shows how to transpile the TypeScript code to JavaScript in order to run it with Node.js.', '<p>Node.js and PostgreSQL are both powerful technologies for building server-side applications, and when used together, they can offer a powerful and efficient development experience. In this post, we will explore how to set up a Node.js and PostgreSQL project, and how to configure them to work together using TypeScript.</p><br/><p>First, let''s start by setting up a new Node.js project. Create a new directory for your project, then initialize it using npm:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ mkdir my-project<br>$ cd my-project<br>$ npm init -y</div><br><p>This command will create a new package.json file in your project directory.</p><br/><p>Next, let''s install TypeScript as a development dependency:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ npm install --save-dev typescript`</div><br><p>Now, let''s create a new TypeScript configuration file called "tsconfig.json" in the root of your project:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ npx tsc --init</div><br><p>This command will create a new "tsconfig.json" file in your project directory, which is used to configure the TypeScript compiler.</p><br/><p>Next, let''s install the necessary dependencies to connect to a PostgreSQL database and to use TypeScript:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ npm install --save pg @types/pg</div><br><p>Now, let''s create a new directory called "src" in the root of your project, and create a new file called "database.ts" inside of it:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ mkdir src<br>$ touch src/database.ts</div><br><p>In this file, we will use the pg library to create a connection to the database:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">import { Pool } from ''pg'';<br><br>const pool = new Pool({&nbsp;&nbsp;&nbsp;user: ''your_username'',<br>&nbsp;&nbsp;&nbsp;host: ''your_host'',<br>&nbsp;&nbsp;&nbsp;database: ''your_database'',<br>&nbsp;&nbsp;&nbsp;password: ''your_password'',<br>&nbsp;&nbsp;&nbsp;port: your_port,<br>});<br><br>export const query = (text: string, params?: any[]) => pool.query(text, params);</div><br><p>This code creates a new connection pool to the database using the pg library. It exports a single query function that can be used to execute SQL statements. You will need to replace the placeholders in this example with your own database credentials.</p><br/><p>Next, let''s create a new file called "index.ts" in the src directory that will be the entry point for your application:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ touch src/index.ts</div><br><p>In this file, we can import the database.ts file and use the query function to execute some SQL statements:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">import { query } from ''./database'';<br><br>query(''SELECT NOW()'', (err, res) => {<br>&nbsp;&nbsp;&nbsp;console.log(err, res);<br>&nbsp;&nbsp;&nbsp;pool.end();<br>});</div><br><p>This code imports the database.ts file and calls the query function to execute a simple SELECT statement that returns the current time.</p><br/><p>Now we need to transpile our typescript code to javascript, we can do this by adding a script in the package.json file:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">"scripts": {<br>&nbsp;&nbsp;&nbsp;"start": "tsc && node dist/src/index.js",<br>&nbsp;&nbsp;&nbsp;"build": "tsc"<br>},</div><br><p>With this script, we are transpiling the code to javascript and then running it with node. Now we can start our server by running:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ npm start</div><br><p>And you should be able to see the current time returned by the query in the console.</p><br/><p>In summary, by configuring Node.js and PostgreSQL to work together using TypeScript, we can take advantage of the powerful features of both technologies to build efficient and scalable server-side applications. The example provided in this tutorial is very simple but it serves as a starting point to connect to a PostgreSQL database and execute queries from a Node.js application. There are many other tools and configurations available to explore and it is important to consider security, scalability and best practices when working with databases.</p><br/><p>It is important to note that in this example, we are using pg library which is a popular one for connecting to PostgreSQL from Node.js. But there are other libraries available like Sequelize, TypeORM, Knex.js etc. Additionally, we are using TypeScript to write our code, providing us with features like type checking, interfaces, classes and more that improve the development experience and maintainability of our code.</p>'),
('nodejs-expressjs-typescript','Set up Server-side Applications with Node.js, Express.js and TypeScript', 'nodejs,expressjs,typescript', 'In this blog post, we discussed how to configure Node.js, Express.js and TypeScript to work together to build efficient and scalable server-side applications. We provided step-by-step instructions and code examples to set up a new Node.js and Express.js project, and use TypeScript to improve the development experience and maintainability of the code.', '<p>Node.js and Express.js are both popular technologies for building server-side applications, and when used together, they can offer a powerful and efficient development experience. In this post, we will explore how to set up a Node.js and Express.js project, and how to configure them to work together using TypeScript.</p><br/><p>First, let''s start by setting up a new Node.js project. Create a new directory for your project, then initialize it using npm:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ mkdir my-project<br/>$ cd my-project<br/>$ npm init -y</div><br><p>This command will create a new package.json file in your project directory.</p><br/><p>Next, let''s install TypeScript as a development dependency:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ npm install --save-dev typescript</div><br><p>Now, let''s create a new TypeScript configuration file called "tsconfig.json" in the root of your project:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ npx tsc --init</div><br><p>This command will create a new "tsconfig.json" file in your project directory, which is used to configure the TypeScript compiler.</p><br/><p>Next, let''s install the necessary dependencies to use Express.js and TypeScript:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ npm install --save express @types/express</div><br><p>Now, let''s create a new directory called "src" in the root of your project, and create a new file called "app.ts" inside of it:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ mkdir src<br/>$ touch src/app.ts</div><br><p>In this file, we will import Express and create a new Express application:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">import express, { Application } from ''express'';<br/><br/>const app: Application = express();<br/><br/>app.get(''/'', (req, res) => {<br/>&nbsp;&nbsp;&nbsp;res.send(''Hello World!'');<br/>});<br/><br/>export default app;</div><br><p>This code creates a new Express application and sets up a simple route that responds to a GET request to the root path with "Hello World!". We also set up the server to listen on port 3000, or if the PORT environment variable is set, it will use that port.</p><br/><p>Next, let''s create a new file called "index.ts" in the src directory that will be the entry point for your application:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ touch src/index.ts</div><br><p>In this file, we can import the app.ts file and use it to start the server:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">import app from ''./app'';<br/><br/>const port = process.env.PORT || 3000;<br/><br/>app.listen(port, () => {<br/>&nbsp;&nbsp;&nbsp;console.log(`Server started on port ${port}`);<br/>});</div><br><p>Now we need to transpile our typescript code to javascript, we can do this by adding a script in the package.json file:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">"scripts": {<br/>&nbsp;&nbsp;&nbsp;"start": "tsc && node dist/src/index.js",<br/>&nbsp;&nbsp;&nbsp;"build": "tsc"<br/>},</div><br><p>With this script, we are transpiling the code to javascript and then running it with node. Now we can start our server by running:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ npm start</div><br><p>In summary, by configuring Node.js and Express.js to work together using TypeScript, we can take advantage of the powerful features of both technologies to build efficient and scalable server-side applications. The example provided in this tutorial is very simple but it serves as a starting point to create a basic Express application and start a server with Node.js. There are many other tools and configurations available to explore and it is important to consider security, scalability and best practices when working with Express.js. Additionally, by using TypeScript, we can improve the development experience and maintainability of our code by taking advantage of features like type checking, interfaces, classes and more.</p><br/><p>It is important to note that this example is a simple one and there are many more things you can do with Express.js and Node.js like using middlewares, routing, error handling and more. Additionally, there are other frameworks available for Node.js like Nest.js and Koa.js that build on top of Express.js and offer more features.</p><br/><p>In this blog post, I''ve shown you how to create a basic Express application with Node.js and TypeScript, and how to start a server with it. With this setup, you can now start building more complex and robust applications that take advantage of both technologies.</p>'),
('expressjs-json-web-token-typescript','Secure your Express.js App with JSON Web Tokens (JWT) and TypeScript', 'expressjs,typescript', 'summary', '<p>Express.js is a popular framework for building server-side applications, and one of its key features is its support for middleware. Middleware functions are used to perform tasks such as authentication, logging, and error handling, and they can be easily added to the request-response cycle in Express.js. In this post, we will explore how to create a middleware function that uses JSON Web Tokens (JWT) for authentication in an Express.js application, using TypeScript.</p><br/><p>First, let''s start by setting up a new Express.js project. Create a new directory for your project, then initialize it using npm:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ mkdir my-project<br/>$ cd my-project<br/>$ npm init -y</div><br><p>This command will create a new package.json file in your project directory.</p><br/><p>Next, let''s install TypeScript as a development dependency:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ npm install --save-dev typescript</div><br><p>Now, let''s create a new TypeScript configuration file called "tsconfig.json" in the root of your project:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ npx tsc --init</div><br><p>This command will create a new "tsconfig.json" file in your project directory, which is used to configure the TypeScript compiler.</p><br/><p>Next, let''s install the necessary dependencies to use Express.js, jsonwebtoken, and TypeScript:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ npm install --save express @types/express jsonwebtoken</div><br><p>Now, let''s create a new directory called "src" in the root of your project, and create a new file called "app.ts" inside of it:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ mkdir src<br/>$ touch src/app.ts</div><br><p>In this file, we will import express and jsonwebtoken, create a new Express application, and set up a simple route that requires authentication:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">import express, { Application } from ''express'';<br/>import jwt from ''jsonwebtoken'';<br/><br/>const app: Application = express();<br/><br/>// Authentication middleware<br/>const authenticate = (req, res, next) => {<br/>&nbsp;&nbsp;&nbsp;// Extract token from headers<br/>&nbsp;&nbsp;&nbsp;const token = req.headers.authorization;<br/>&nbsp;&nbsp;&nbsp;if (!token) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return res.status(401).json({ message: ''Access Denied'' });<br/>&nbsp;&nbsp;&nbsp;}<br/>&nbsp;&nbsp;&nbsp;try {<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Verify token<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const decoded = jwt.verify(token, ''secret'');<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;req.user = decoded;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;next();<br/>&nbsp;&nbsp;&nbsp;} catch (error) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return res.status(401).json({ message: ''Invalid Token'' });<br/>&nbsp;&nbsp;&nbsp;}<br/>}<br/><br/>// Protected route<br/>app.get(''/'', authenticate, (req, res) => {<br/>&nbsp;&nbsp;&nbsp;res.send(''Welcome '' + req.user.name);<br/>});<br/><br/>const port = process.env.PORT || 3000;<br/><br/>app.listen(port, () => {<br/>&nbsp;&nbsp;&nbsp;console.log(`Server started on port ${port}`);<br/>});</div><br><p>This code creates a new Express application and sets up a simple route that responds to a GET request to the root path with a message containing the name of the authenticated user. We also created an authentication middleware that uses jsonwebtoken to verify the token passed in the headers. If the token is valid, the middleware will set the user information in the req object and pass the request to the next middleware. If the token is invalid or not present, the middleware will return a 401 status code.</p><br/><p>Now we need to transpile our typescript code to javascript, we can do this by adding a script in the package.json file:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">"scripts": {<br/>&nbsp;&nbsp;&nbsp;"start": "tsc && node dist/src/index.js",<br/>&nbsp;&nbsp;&nbsp;"build": "tsc"<br/>},</div><br><p>With this script, we are transpiling the code to javascript and then running it with node. Now we can start our server by running:</p><br/><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ npm start</div><br><p>It is important to note that this example is a simple one and there are many more things you can do with Express.js and jsonwebtoken like creating routes, error handling and more. Additionally, there are other libraries available for authentication and authorization like passport, OAuth, etc.</p><br/><p>In this blog post, I''ve shown you how to create a middleware function that uses jsonwebtoken for authentication in an Express.js application using TypeScript. With this setup, you can now start building more complex and robust applications that take advantage of both technologies.</p>'),
('install-docker-on-ubuntu','Installing the Latest Version of Docker on Ubuntu 20.04.1 LTS', 'docker', 'Learn how to install the latest version of Docker on Ubuntu 20.04.1 LTS in a few easy steps. This guide covers all the necessary steps, from updating existing packages to adding the official Docker repository and starting the Docker service. By the end of this post, you will have Docker up and running on your system.', '<p>Installing Docker on Ubuntu 20.04.1 LTS is a simple process. In this guide, we will go through the steps needed to install the latest version of Docker on your system.</p><br><p><b>Step 1: Update existing packages</b></p><p>Start by updating your existing packages by running the following command:</p><br><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ sudo apt update</div><br><p><b>Step 2: Install dependencies</b></p><p>Next, you will need to install some dependencies that are required for Docker to run. You can do this by running the following command:</p><br><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ sudo apt install apt-transport-https ca-certificates curl software-properties-common</div><br><p><b>Step 3: Add the Docker repository</b></p><p>Once the dependencies are installed, you can add the official Docker repository to your system by running the following command:</p><br><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -<br>$ sudo add-apt-repository &quot;deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable&quot;</div><br><p><b>Step 4: Install Docker</b></p><p>With the repository added, you can now update your package list and install the latest version of Docker by running the following command:</p><br><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ sudo apt update<br>$ sudo apt install docker-ce</div><br><p><b>Step 5: Start the Docker service</b></p><p>After the installation is complete, you can start the Docker service by running the following command:</p><br><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ sudo systemctl start docker</div><br><p><b>Step 6: Enable the service</b></p><p>To ensure that Docker starts automatically at boot time, you can enable the service with this command:</p><br><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ sudo systemctl enable docker</div><br><p><b>Step 7: Add your user to the docker group</b></p><p>Before running any docker command, you need to add your user to the docker group with this command:</p><br><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ sudo usermod -aG docker $USER</div><p>This will allow you to run docker commands without the need of using &#39;sudo&#39; every time.</p><br><p><b>Check Installation</b></p><p>To check that the installation is working correctly, you can run the following command:</p><br><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ docker version</div><p>This command will return the version of the Docker installed on your system, and also it will show you the version of the client and the version of the server.</p><br>'),
('dockerfile','Dockerfile: A Beginner''s Guide with Code Examples', 'docker', 'This blog post provides an introduction to the basics of Docker and Dockerfile. We cover what Docker and Dockerfiles are, why they are useful, and provide an example of how to set up a simple Node.js web application using a Dockerfile. We also show how to build and run the container using the command line.', '<p>Docker is a powerful platform that allows developers to easily create, deploy, and run applications in a containerized environment. One of the key features of Docker is the ability to use Dockerfiles, which are simple text files that contain instructions for building a Docker image.</p><br/><p>A Dockerfile is a script which contains all the commands a user could call on the command line to assemble an image. Using docker build users can create an automated build that executes several command-line instructions in succession.</p><br/><p>Here''s an example Dockerfile for a simple Node.js web application:</p><br><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">FROM node:14-alpine<br><br>WORKDIR /app<br><br>COPY package.json .<br>RUN npm install<br><br>COPY . .<br><br>EXPOSE 3000<br>CMD ["npm", "start"]</div><br><p>In this example, we''re using the official Node.js 14 image from Docker Hub as our base image. We set the working directory to "/app" and copy the "package.json" file and run npm install. After that, we copy all the files in the current directory to the working directory in the container. We then expose port 3000 and set the command to start the application.</p><br/><p>To build the image, we can run the following command in the same directory as the Dockerfile:</p><br><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ docker build -t my-node-app .</div><br><p>This command tells Docker to build an image named "my-node-app" using the Dockerfile in the current directory.</p><br/><p>Once the image is built, we can run the container using the following command:</p><br><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ docker run -p 3000:3000 my-node-app</div><br><p>This command tells Docker to run a container from the "my-node-app" image, and map port 3000 on the host to port 3000 in the container.</p><br/><p>Dockerfiles are a powerful tool for creating consistent, repeatable builds for your applications. They also make it easy to share your application with others, as they can simply build the image using the same Dockerfile.</p><br/><p>Docker is a great tool for developers, allowing them to easily create, deploy, and run applications in a containerized environment. With the use of Dockerfile, developers can automate the process of building and deploying their applications. This tutorial serves as an introduction to the basics of Docker and Dockerfiles and provides an example of how to set up a simple Node.js web application.</p>'),
('docker-compose','Getting Started with Docker Compose', 'docker', 'In this blog post, we take a look at Docker Compose, a tool for defining and running multi-container Docker applications. We cover how to install and use Docker Compose, and provide an example of how to set up a simple web application that uses a PostgreSQL database. We also show how to manage and stop the container using some basic command.', '<p>Docker Compose is a tool for defining and running multi-container Docker applications. It allows you to configure and run multiple containers at once, making it easier to manage and deploy your application.</p><br><p>To use Docker Compose, you''ll first need to have Docker installed on your system. Once you have Docker up and running, you can install Docker Compose by following the instructions for your operating system on the Docker website.</p><br><p>Once you have Docker Compose installed, you''ll need to create a "docker-compose.yml" file in the root of your project. This file defines the services that make up your application, and how they are connected to one another.</p><br><p>Here''s an example "docker-compose.yml" file for a simple web application that uses a PostgreSQL database:</p><br><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">version: ''3''<br>services:</br>&nbsp;&nbsp;&nbsp;web:<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build: .</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ports:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- "3000:3000"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;links:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- db<br>&nbsp;&nbsp;&nbsp;db:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image: postgres<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;environment:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- POSTGRES_DB=my_db<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- POSTGRES_USER=my_user<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- POSTGRES_PASSWORD=my_password</div><br><p>In this example, we have two services: "web" and "db". The "web" service is built from the current directory (indicated by the "."), and maps port 3000 on the host to port 3000 in the container. It also links to the "db" service.</p><br/><p>The "db" service uses the official "postgres" image from Docker Hub, and sets some environment variables to configure the database.</p><br><p>With this "docker-compose.yml" file in place, you can use the "docker-compose up" command to start all of the services defined in the file:<p><br><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">$ docker-compose up</div><br><p>You can also use "docker-compose down" to stop and remove the containers, and "docker-compose build" to build the images again.</p><br/><p>Docker Compose makes it easy to define and run multi-container applications, and is a great tool for development and testing. To learn more about Docker Compose, check out the official documentation.</p>'),
('docker-compose-secrets','Securing Your Multi-Container Applications with Docker Compose Secrets', 'docker', 'Learn how to use Docker Compose''s secrets feature to securely manage sensitive information in your multi-container applications. By using the secrets field in the docker-compose.yml file, you can keep sensitive information separate from your application code and out of version control, ensuring that sensitive information is not accidentally leaked or exposed.', '<p>Docker Compose is a powerful tool that enables developers to easily define and run multi-container applications. One of the key features of Docker Compose is the ability to store and manage sensitive information, such as passwords and API keys, using the <b>secrets</b> field in the <b>docker-compose.yml</b> file.</p><br><p>The <b>secrets</b> field allows developers to keep sensitive information separate from the application code and out of version control. This is important because it ensures that sensitive information is not accidentally leaked or exposed.</p><br><p>To use the secrets field, you first need to define the secret in the docker-compose.yml file. Here''s an example of how to do this:</p><br><div style="border:1px solid #ccc;padding:5px 10px; margin-top:8px; margin-bottom:8px">services:<br>&nbsp;&nbsp;&nbsp;app:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;secrets:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- mysecret<br><br>secrets:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mysecret:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file: secret.txt<br></div><br><p>This tells Docker Compose to create a secret called <b>mysecret</b> and to reference the contents of the <b>secret.txt</b> file. The <b>services</b> block define the services that are part of your application, and <b>app</b> is one of them. The <b>secrets</b> field under the services block tells compose to use the secret <b>mysecret</b> for this service, and the <b>secrets</b> field at the root level, defines the secret.</p><br><p>Once the secret is defined, it can be accessed by your application in the container at the <b>/run/secrets/mysecret</b> location.</p><br><p>It is important to note that the <b>secret.txt</b> file should be in the same directory as your <b>docker-compose.yml</b> file and it should be ignored from version control.</p><br><p>This feature is available on Docker version 1.13 and higher, so you should check your version before using this feature.</p><br><p>In conclusion, using the <b>secrets</b> field in Docker Compose is a simple and secure way to manage sensitive information in your application. It allows you to keep your secrets separate from your application code and out of version control, ensuring that sensitive information is not accidentally leaked or exposed.</p>');