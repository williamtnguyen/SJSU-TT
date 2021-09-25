const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');
const AWS = require('aws-sdk');

const seedDB = require('./routes/api/util/scripts/seed-database');

// Allows requests from diff origins
app.use(cors());

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
const { MongoURI } = JSON.parse(fs.readFileSync('./config/secrets.json'));
switch (process.env.NODE_ENV) {
  case 'development':
    mongoose
      .connect(MongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => {
        console.log('DEVELOPMENT MODE: Connected to MongoDB Atlas\n');
        seedDB();
      })
      .catch((error) => {
        throw new Error(error);
      });
    break;
  case 'production':
    mongoose
      .connect('mongodb://mongodb-container:27017/sjsu-tt-database', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => {
        console.log('PRODUCTION MODE: Connected to MongoDB container\n');
        seedDB();
      })
      .catch((error) => {
        throw new Error(error);
      });
    break;
  default:
    console.error('NODE_ENV not specified');
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (error) => {
  if (error) {
    throw new Error(error);
  }
  console.log(`Server started on port ${PORT}`);
});
