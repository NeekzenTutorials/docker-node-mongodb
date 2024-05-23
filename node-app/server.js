require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const port = process.env.PORT || 8090;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  try {
    res.render('index', { title: 'Home', data });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({
      message: "An error occurred while retrieving data."
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
