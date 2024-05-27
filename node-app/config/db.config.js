const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGO_URL;
const maxRetries = 10;
let retries = 0;

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('MongoDB is connected');
    })
    .catch((err) => {
      retries += 1;
      console.log(`MongoDB connection unsuccessful (attempt ${retries}), retrying after 5 seconds...`, err);
      if (retries >= maxRetries) {
        console.error('Maximum retry attempts reached. Exiting...');
        process.exit(1); // Arrêter l'application après avoir atteint le nombre maximum de tentatives
      } else {
        setTimeout(connectWithRetry, 5000);
      }
    });
};

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected. Retrying connection...');
  if (retries < maxRetries) {
    setTimeout(connectWithRetry, 5000);
  }
});

connectWithRetry();
