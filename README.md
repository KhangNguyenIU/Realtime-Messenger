b

<div align="center"> 
<h1>MERN STACK - CHAT APPLICATION</h1>
</div>
<div align="center">

![alt text](https://res.cloudinary.com/katyperrycbt/image/upload/v1654262470/cccvczhtelxm1wp6cnrl.png)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

> Backend [repository](https://github.com/KhangNguyenIU/WAD---Chat-app-Api)

>Link [Demo](https://wad-chat-app-frontend.vercel.app/)
## Description :	🍀

This project is the evaluation assignment for the Web Applcation and development course in [International University](https://hcmiu.edu.vn/). Feel free to folk for any personal use.

The scope of this project is to make a real-time chat application where users can chatting with immediately response.

## Table of content
- [Introduction](#introduction)
- [Literature Review](#literature-review)
- [System Design](#system-design)
- [System Implementation](#system-implementation)
- [Conclusion](#conclusion)

## Introduction :	🌟	
Real-time technology has enhanced the user experience based on the ability to respond immediately and spread among users. In which, the Facebook messaging site seems to be too popular. In an interview with Facebook's head of UI design, he said that:

> Facebook's UI must to be suitable for all ages from very young user to middle ages or even upper ages, so it seems boring to young generation... 


With the mentality of a young person and a passion to explore real-time technology, I started to make a messaging website with a more youthful UI and promote user data privacy with auto-delete message function. like on Signal and Whatsapp



## Features 🎡
- Sending and recieving messages between user to user or among a group of users .
- Forwarding message between groups
- Automating delete message after a defined periods of time
- End to end encryption .
- Flexible Emoji .
- User online status

## Literature Review 📘 :
### 1. Nodejs 
Node.js comes up with its event-driven features and non-blocking I/O operations seem to be suitable for  any real-time application requirement that  are speed and scalability

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

### 2. Reactjs
React makes it easier to create interactive users
interfaces. It effectively updates through rendering the correct components to your viewport
each state and make data changes in the application.
In ReactJS, every component manages their own state and composes them for the user
interfaces

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
### 3. Socketio
Socket.IO allows client and server communication in both directions. When a client has Socket.IO installed in their browser and a server has also installed the Socket.IO package, bi-directional communication is possible. While data can be delivered in a variety of formats, JSON is the most straightforward.

![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
### 4. Heroku

Heroku is the Platform as a Service (Paas) that provides virtual computers for hosting services. Heroku is built on top of AWS, but this platform makes life easier when fully supports config the web server and many adds-on for database use

![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## System Design : 🎨

### 1. System Requirement :📃

#### a. Functional Requirement

- User can create new account, login to system
- User can create new chat room 
- User can retrieve message of a chat room
- User can send message in type of text or image
- User can leave room
- User can forward message from 1 room to other room
- Message can be automatically removed after a period time(define by user)


#### b. Non-functional Requirement
- The website must be hosted and have SSL certificate
- The system must display the status of related users of specific chat room ( display when other users are typing, the online status of each user)
#### c. Functional Analysis
From the requirement, The system need the User Entity to store the user information  and the authentication module to keep the user login with the system because Http is the stateless protocol.
The chat room Entity to store the information of a conversation and a One to Many relation with the users as the participants of the chat. And the Many to Many relation with the Message Entity
The Message Entity store the content of the message 

### 2. System Design Specification  :	📑


#### A. Use case diagram

![alt text](https://res.cloudinary.com/katyperrycbt/image/upload/v1654413172/eq274pvdy7musul65og1.png)

<div align="center"> 
<p style="font-style: italic;">Figure 1: Use case Diagram</p>
</div>
In this project there only 1 actor is the user who interact with the web page. in addition to tasks that require READ(retrieve message of a chat room), They have certain rights to  (UPDATE, DELETE) certain items such as personal information of users, information of chat groups to which they belong.
</br>

#### B. Sequence diagram
![alt text](https://res.cloudinary.com/katyperrycbt/image/upload/v1654413224/bizqdmqk1fax3m61ovse.png)
<div align="center"> 
<p style="font-style: italic;">Figure 2: Sequence Diagram</p>
</div>

#### C. Architecture
![alt text](https://res.cloudinary.com/katyperrycbt/image/upload/v1653570191/n0aat5n9niwjvyijniu4.png)

<div align="center"> 
<p style="font-style: italic;">Figure 3: Website Architecture</p>
</div>

#### D. Database Design
![alt text](https://res.cloudinary.com/katyperrycbt/image/upload/v1654260807/oa9xs8gagcih6e7dasjx.png)
<div align="center"> 
<p style="font-style: italic;">Figure 4: Database design Diagram</p>
</div>

## System Implementation ✏️

### 1. Jsonwebtoken authentication
We use Jsonwebtoken(Jwt) method to authenticate users because HTTP protocal is stateless, it can't remember who has logged into the system. Every time a user successfully logs into the system, the system will generate a token that has encrypted the user's information. The system sets the token in to the http-only cookie, which only retrieves by the http request. The user will attach this token in the header of each request, the system will decode this token string to verify who is using the system.

### 2. MongoDB and Mongoose
We use a nosql database - MongoDB. This database is really flexible, easy to access, and rarely requires joins or transactions, but when you need to do complex querying, it's more than up to the task. And Mongoose as a Node.js-based Object Data Modeling (ODM) library for MongoDB which enforces a specific schema at the application layer and avoids using SQL queries that can lead to SQL Injection risks

### 4. File uploading
In uploading images we choose a cloud database suitable for media storage, which is Cloudinary. But we were hesitating between uploading the image directly from the client side or converting the image to base64 then send to the backend for uploading. In the end we trade off performance when we choose the second option. Uploading images may take longer, but it reduces direct client-to-database interaction.



## Conclusion
### 1. What we have done :🎉
-	We built from scratch a separate web server and client web app and connected them via API requests.
-	We learned how the HTTP protocol works and the Bidirectional mechanism of Socket. How to keep user's logged in status through each request
-	We completed the initial requirements through deploying a complete website through hosting and domain name services.


### 2. Further development 🚀
- Emoji system to make the user experience better
- End to end encryption




