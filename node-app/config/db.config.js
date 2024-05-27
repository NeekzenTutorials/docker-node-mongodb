const mongoose = require('mongoose');
const Example = require('../models/example.model.js');
require('dotenv').config();

// Connect to MongoDB with retry
const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  return mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
      console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', err);
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log('MongoDB is connected');
      insertInitialData();
    }
  });
};


// Insert test data
const insertInitialData = async () => {
  const existingData = await Example.find();
  if (existingData.length === 0) {
    const initialData = [
      { name: "John Doe", age: 30, email: "john.doe@example.com" },
      { name: "Jane Doe", age: 25, email: "jane.doe@example.com" }
    ];
    Example.insertMany(initialData)
      .then(() => console.log('Initial data inserted'))
      .catch(err => console.log('Error inserting initial data: ', err));
  } else {
    console.log('Initial data already exists, skipping insertion');
  }
};

connectWithRetry();
