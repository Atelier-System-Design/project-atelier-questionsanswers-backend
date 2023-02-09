# Atelier Questions and Answers Service
The Atelier Questions and Answers service supports the Q&A section of the [Atelier Product Page](https://github.com/TeamJBox/rfp2210-fec). The objective was to replace the existing API that can support the full data set for the retail website and scaled to meet the demands of production traffic. The original monolithic system was broken into 3 separate categories (products, reviews, Q&A) to be able to scale each service accordingly.

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
Built and optimized a back-end API for an e-commerce application capable of handling 10,000 requests per second with a < 1% error rate.

Initial API performance handled less that 200 requests per second and the target goal was to hit 1000 requests per second with an average latency under 2000ms and error rate under 1%.

Final architecture consists of an NGINX load balancer, 10 Node/Express servers, and one PostgreSQL database. API endpoints have been optimized and tuned to handle production level traffic (verified by loader.io stress test).
 
## Final Architecture
![Screen Shot 2023-02-08 at 10 20 32 AM](https://user-images.githubusercontent.com/18542870/217722271-e2aa2fbb-384d-4105-9a1c-6f937a2211ee.png)

## Local Stress Testing
Tested API endpoints locally with k6 and reduced query times with aggregate and JSON build functions

<img width="1092" alt="Screen Shot 2023-01-02 at 4 45 53 PM" src="https://user-images.githubusercontent.com/18542870/217724744-bcbdda40-0ab3-4edc-8c4b-fa260648ed2d.png">

## Deployment
A single server instance under 200rps load showed an average response rate of 371ms and a 4.2% error rate.

![1instance1container200rps](https://user-images.githubusercontent.com/18542870/217726083-06ef9f6f-37e0-4397-9a4b-d76cd57f2545.png)

After adding 2 additional server instances, an NGINX load balancer, and configuring with caching; It was able to handle 2500rps with average response rate of 10ms and 0.1% error rate.

<img width="1277" alt="3 instances 2500 rps cache2" src="https://user-images.githubusercontent.com/18542870/217726766-a4c868d9-5e6d-4901-a3b5-1694a0585857.png">

## Resources
API Documentation: [Questions and Answers API](https://gist.github.com/trentgoing/d69849d6c16b82d279ffc4ecd127f49f#file-qa-md)

# Contributor
Justin Chong

