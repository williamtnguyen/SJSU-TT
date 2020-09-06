const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, (error) => {
  if (error) {
    throw new Error(`ERROR: ${error}`);
  }
  console.log(`Server started on port ${PORT}`);
});
