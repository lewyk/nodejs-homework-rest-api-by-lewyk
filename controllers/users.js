const jwt = require('jsonwebtoken');
require('dotenv').config();
const Users = require('../model/users');
const { HttpCode } = require('../helpers/constants');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const signup = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    if (user) {
      return res
        .status(HttpCode.CONFLICT)
        .json({ message: 'Email is already in use' });
    }
    const newUser = await Users.create(req.body);
    const { id, email, subscription } = newUser;

    return res.status(HttpCode.CREATED).json({ id, email, subscription });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.validPassword(password);

    if (!user || !isValidPassword) {
      return res
        .status(HttpCode.UNAUTHORIZED)
        .json({ message: 'Invalid crendentials' });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' });
    await Users.updateToken(user.id, token);

    return res.status(HttpCode.OK).json({ token });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  await Users.updateToken(req.user.id, null);

  return res.status(HttpCode.NO_CONTENT).json({});
};

const сurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;

    return res.status(HttpCode.OK).json({ email, subscription });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  signup,
  login,
  logout,
  сurrent
};
