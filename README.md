# Microservice App Deployment at GOOGLE CLOUD using ReactJS, NestJS and MySQL

## Objective

We deploy a pure microservice architecture model at Google Cloude Platform (GCP). We'll use Single VPC and Five VM, Each VM will will different purposes. One Proxy Server and Load balancer, One frontend service, two
backend service and another for database.

![Microservice Application Deployment at GCP](https://github.com/limon636/gcp-deployment-fullstack/blob/main/img/gcp-fullstack.png?raw=true)

## Technologies

1. Frontend service by Vite + ReactJS
2. Backend service by NestJS
3. MySQL Database
4. Nginx as Proxy server and load balancer

## Features

1. Nginx Load Balancer
2. User Create/Read/Update/Delete

## Procedure

Follow some steps to successfully deploy the application.
First we have to create a VPC, a NAT and Five VM instance. Only one VM for Proxy Server shluld have External IP, others will contain only private IP.
Install all required service like Nginx, NodeJS, Git and MySQL Server.

### NGINX Proxy Server Setup

Following Command Line will make proxy server to use..

`sudo apt-get update`

`sudo apt install nginx`

Update nginx.conf file

`sudo vi /etc/nginx/nginx.conf`

`

events { # empty placeholder
}

http {

    server {
        listen 80;

        location / {
            proxy_pass http://client;
        }

        location /api/ {
            rewrite ^/api/(.*)$ /$1 break;
            proxy_pass http://backend;
        }
    }

    upstream client {
        server 10.20.0.3;
    }

    upstream backend {
        server 10.20.0.4:9000;
        server 10.20.0.5:9000;
    }

}
`

`sudo nginx -s reload`

**NGINX Proxy Server is now ready to use**

### Client/Frontend Server Setup

Use following commands

`sudo apt-get update`

`curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs1`

`sudo apt install git`

`sudo mkdir opt && cd opt`

`git clone https://github.com/username/repo`

`cd repo`

`npm install`

_Edit src/config/data.js, set proxy server IP/api in BASE_URL_

`npm run build`

`sudo npm install yarn -g`

`sudo yarn preview --host --port 80`

**Client/Frontend Server is now ready to use**

### Backend Server Setup

Use following command

`sudo apt-get update`

`curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs1`

`sudo apt install git`

`sudo mkdir opt && cd opt`

`git clone https://github.com/username/repo`

`cd repo`

`npm install`

**Update mysql connection at src/app.module.ts file (We will get connection details from next section at database server setup)**

1. hostname => 10.20.0.6
2. username => root
3. password => root
4. database => gcp

`npm run start`

**API Server is now ready to use**

### Database Server Setup

Use following command

`sudo apt-get update`

`sudo apt-get install -y mysql.server`

`sudo vi /etc/mysql/mariadb.conf.d/50-server.cnf`

`bind-address = 0.0.0.0`

`sudo service mysql restart`

`mysql -u root -p mysql`

For MariaDB

`ALTER USER 'root'@'localhost' IDENTIFIED VIA mysql_native_password USING PASSWORD('root');`

For MySQL

`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';`

`CREATE USER 'root'@'%' IDENTIFIED BY 'password';`

`GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;`

`FLUSH PRIVILEGES;`

`ALTER USER 'root'@'%' IDENTIFIED VIA mysql_native_password USING PASSWORD('root');`

`CREATE DATABASE gcp;`

`use gcp;`

`
CREATE TABLE`users`(
 `id`int NOT NULL AUTO_INCREMENT,
 `first_name`varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
 `last_name`varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
 `address` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`

**Yeah, thats it!**
