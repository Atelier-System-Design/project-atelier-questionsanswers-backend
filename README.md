# Atelier Questions and Answers Service
The Atelier Questions and Answers service supports the Q&A section of the [Atelier Product Page](https://github.com/TeamJBox/rfp2210-fec).

## Tech Stack
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
 ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
 
## Overview
The final architecture consists of an NGINX load balancer, 10 Node/Express servers, and one PostgreSQL database. API endpoints have been optimized and tuned to handle production level traffic (verified by loader.io stress test).
 
## Architecture![Screen Shot 2023-02-08 at 10 20 32 AM](https://user-images.githubusercontent.com/18542870/217722271-e2aa2fbb-384d-4105-9a1c-6f937a2211ee.png)
