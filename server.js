const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');

// Middleware for parsing form inputs
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serving all routes under prefix 'localhost:5000/api/*'
const routes = require('./routes/api');
app.use('/api', routes);

// Connecting to MongoDB
const { MongoURI } = JSON.parse(fs.readFileSync('./config/secrets.json'));
mongoose
  .connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB successfully connected...'))
  .catch((error) => {
    throw new Error(`Error: ${error}`);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (error) => {
  if (error) {
    throw new Error(`Error: ${error}`);
  }
  console.log(`Server started on port ${PORT}`);
});
