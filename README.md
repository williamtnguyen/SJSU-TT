# SJSU Theta Tau Website / Registry Portal

[![Build Status](https://travis-ci.org/williamtnguyen/SJSU-TT.svg?branch=master)](https://travis-ci.com/williamtnguyen/SJSU-TT)

A full stack web application built with [Gatsby](https://github.com/gatsbyjs/gatsby) and [Express](https://github.com/expressjs/express).

## Installation

Clone the repository

```
$ git clone https://github.com/williamtnguyen/SJSU-TT.git
```

Install dependencies for frontend and backend

```
$ cd frontend
$ npm i -g gatsby-cli
$ npm install
$ cd ../server
$ npm install
```

Navigate to the `/config` folder and make a copy of the `secrets.example.json` file and name it `secrets.json`. Please reach out for the secret file contents.

## Running the application

To run the full-stack application, start each server in a terminal tab:

```
$ cd frontend
$ npm run dev
```

```
$ cd server
$ npm run dev
```

If everything works, the terminal running the backend will respond with

```
Server started on port 5000
Development mode: Connected to MongoDB Atlas
```

and the terminal running the frontend will respond with

```
success Building development bundle - X.XXXs
```

Visit `http://localhost:8000` to open the development environment
