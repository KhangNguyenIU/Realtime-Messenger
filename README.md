# MERN STACK - CHAT APPLICATION

<div align="center">
 
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

</div>


> Backend [repository](https://github.com/KhangNguyenIU/WAD---Chat-app-Api)
## Description

This project is the evaluation assignment for the Web Applcation and development course in [International University](https://hcmiu.edu.vn/). Feel free to folk for any personal use.

The scope of this project is to make a real-time chat application. 

## Table of content
- [Introduction](#introduction)
- [Literature Review](#literature-review)
- [System Design](#system-design)
- [System Implementation](#system-implementation)
- [Conclusion](#conclusion)
- [Guideline](#guideline)
- [Contributor](#contributor)
## Introduction
Real-time technology has enhanced the user experience based on the ability to respond immediately and spread among users. In which, the Facebook messaging site seems to be too popular. In an interview with Facebook's head of UI design, he said that:
> Facebook's UI must to be suitable for all ages from very young user to middle ages or even upper ages, so it seems boring to young generation... 

With the mentality of a young person and a passion to explore real-time technology, I started to make a messaging website with a more youthful UI and promote user data privacy with auto-delete message function. like on Signal and Whatsapp



## Features
- Sending and recieving messages between user to user or among a group of users .
- Automating delete message after a defined periods of time
- End to end encryption .
- Flexible Emoji .
- Good User experience

## Literature Review
### 1. Nodejs 
Node.js comes up with its event-driven features and non-blocking I/O operations seem to be suitable for  any real-time application requirement that  are speed and scalability

### 2. Reactjs


## System Design
![alt text](https://res.cloudinary.com/katyperrycbt/image/upload/v1653570191/n0aat5n9niwjvyijniu4.png)

## Guideline

### frontend:
```bash
REACT_APP_API_URL=********
NODE_ENV=******
```

### backend:
```bash
DB_URI=*********
PORT=***
JWT_SECRET=********
```

Then install all the package with any package manager. 
This project is recommended to use React@18.0.* and react-router-dom@v6 for the most compatible.