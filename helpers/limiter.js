const rateLimit = require('express-rate-limit');
const { HttpCode } = require('./constants');

const TimeLimit = 15 * 60 * 1000; // 15min
const maxConnections = 100;

const limiter = rateLimit({
  windowMs: TimeLimit,
  max: maxConnections,
  handler: (req, res) => {
    res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: 'Too many requests, please try again later.' });
  }
});

module.exports = limiter;
