# SJSU Theta Tau Website / Registry Portal

[![Build Status](https://travis-ci.org/williamtnguyen/SJSU-TT.svg?branch=master)](https://travis-ci.com/williamtnguyen/SJSU-TT)

A full stack web application built with React, Express, and MongoDB.

## Installation

Clone the repository

```
$ git clone https://github.com/williamtnguyen/SJSU-TT.git
```

Install dependencies for frontend and backend

```
$ cd frontend-v2
$ npm install
$ cd ../server
$ npm install
```

### Additional Files

- Navigate to the `/server/config` directory and make a copy of the `secrets.example.json` file and name it `secrets.json`. Please reach out for the secret file contents.
- Navigate to the /frontend-v2 directory and make two files, `.env.development` and `.env.production`. The contents of both files will look like:
```
REACT_APP_HEADSHOT_S3_BUCKET_URL=<reach-out-for-url>
REACT_APP_BACKEND_API_URL=<reach-out-for-url>
```

## Running the application

To run the application, start each server in a terminal tab:

```
$ cd frontend-v2
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
Compiled successfully!

You can now view frontend-v2 in the browser.
```

Visit `http://localhost:3000` to open the development environment
