const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const boolParser = require('express-query-boolean');
const helmet = require('helmet');
const limiter = require('./helpers/limiter');

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const PUBLIC_DIR = process.env.PUBLIC_DIR;
const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
const bodyLimit = 15000; // размер передаваемого body в запросе

require('dotenv').config();

app.use(helmet());

app.use(
  '/avatars',
  express.static(path.join(__dirname, PUBLIC_DIR, AVATARS_OF_USERS))
);

app.use(limiter);
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: bodyLimit }));
app.use(boolParser());

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use('/', (req, res) => res.send('<h3>Contacts api</h3>'));

app.use((req, res) => {
  res.status(404).json({ status: 'error', code: 404, message: 'Not found' });
});

app.use((err, req, res, next) => {
  const code = err.status || 500;
  const status = err.status ? 'error' : 'fail';
  res.status(code).json({ status, code, message: err.message });
});

module.exports = app;
