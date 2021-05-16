const mongoose = require('mongoose');

require('dotenv').config();
const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 5
});

mongoose.connection.on('connected', () => {
  console.log('Database connected successfuly');
});

mongoose.connection.on('error', (err) => {
  console.log(`Database connection error: ${err.message}`);
  process.exit(1);
});

mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected');
});

process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    console.log('Database disconnected');
    process.exit();
  });
});

module.exports = db;
