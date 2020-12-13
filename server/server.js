const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const passport = require('passport');
const AWS = require('aws-sdk');

// Middleware for parsing form inputs
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set configuration for AWS
AWS.config.loadFromPath('./config/secrets.json');

// Serving all routes under prefix 'localhost:5000/api/*'
const routes = require('./routes/api');
app.use('/api', routes);

/**
 * Connect to MongoDB:
 * - If running development environment, use MongoDB Atlas
 * - If running production, spin up MongoDB base docker image
 *  */
if (process.env.NODE_ENV === 'development') {
  const { MongoURI } = JSON.parse(fs.readFileSync('./config/secrets.json'));
  mongoose
    .connect(MongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log('Development mode: Connected to MongoDB Atlas'))
    .catch((error) => {
      throw new Error(error);
    });
}

// Passport.js config (JWT extraction from request headers)
app.use(passport.initialize());
require('./config/passport')(passport);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (error) => {
  if (error) {
    throw new Error(error);
  }
  console.log(`Server started on port ${PORT}`);
});
