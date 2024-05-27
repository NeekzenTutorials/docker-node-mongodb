require("dotenv").config();
console.log('MONGO_URL:', process.env.MONGO_URL);
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const dbConfig = require('./config/db.config.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routers
const exampleRoutes = require('./router/example.router.js');

//Import model
const Example = require('./models/example.model.js');

app.set('view engine', 'ejs');

// Uses routers
app.use('/', exampleRoutes);

app.get('/', async (req, res) => {
  try {
    const examples = await Example.find();
      res.render('index', { examples });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({
      message: "An error occurred while retrieving data."
    });
  }
});

app.get('/db-status', async (req, res) => {
  const dbStatus = mongoose.connection.readyState ? 'connected' : 'disconnected';
  res.send({ dbStatus });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
