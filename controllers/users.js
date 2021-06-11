const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const { promisify } = require('util');

require('dotenv').config();
const Users = require('../model/users');
const { HttpCode } = require('../helpers/constants');

const UploadAvatar = require('../services/upload-avatars-cloud');
const EmailService = require('../services/email');
const { CreateSenderNodemailer } = require('../services/sender-email');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const signup = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    if (user) {
      return res
        .status(HttpCode.CONFLICT)
        .json({ message: 'Email is already in use' });
    }
    const newUser = await Users.create(req.body);
    const { id, name, email, subscription, avatarURL, verificationToken } =
      newUser;
    try {
      const emailService = new EmailService(
        process.env.NODE_ENV,
        new CreateSenderNodemailer()
      );
      await emailService.sendVerifyPasswordEmail(
        verificationToken,
        email,
        name
      );
    } catch (e) {
      console.log(e.message);
    }

    return res
      .status(HttpCode.CREATED)
      .json({ name, id, email, subscription, avatarURL });
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

    if (!user.isVerificated) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        message: 'Check email for verification'
      });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' });
    await Users.updateToken(user.id, token);

    return res.status(HttpCode.OK).json({ token, avatarURL: user.avatarURL });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  await Users.updateToken(req.user.id, null);

  return res.status(HttpCode.NO_CONTENT).json({});
};

const сurrent = async (req, res, next) => {
  try {
    const { name, email, subscription, avatarURL } = req.user;

    return res
      .status(HttpCode.OK)
      .json({ name, email, subscription, avatarURL });
  } catch (error) {
    next(error);
  }
};

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const uploadCloud = promisify(cloudinary.uploader.upload);
    const uploads = new UploadAvatar(uploadCloud);
    const { userIdImg, avatarUrl } = await uploads.saveAvatarToCloud(
      req.file.path,
      req.user.userIdImg
    );
    await Users.updateAvatar(id, avatarUrl, userIdImg);

    return res.json({ avatarUrl });
  } catch (error) {
    next(error);
  }
};

const verificateEmail = async (req, res, next) => {
  try {
    const user = await Users.getUserByVerificationToken(
      req.params.verificationToken
    );
    if (user) {
      await Users.updateVerificationToken(user.id, true, null);
      return res
        .status(HttpCode.OK)
        .json({ message: 'Verification successful' });
    }
    return res.status(HttpCode.NOT_FOUND).json({ message: 'User not found' });
  } catch (error) {
    next(error);
  }
};

const resendVerificationEmail = async (req, res, next) => {
  const user = await Users.findByEmail(req.body.email);
  if (user) {
    const { name, email, verificationToken, isVerificated } = user;

    if (!isVerificated) {
      try {
        const emailService = new EmailService(
          process.env.NODE_ENV,
          new CreateSenderNodemailer()
        );
        await emailService.sendVerifyPasswordEmail(
          verificationToken,
          email,
          name
        );
        return res.status(200).json({ message: 'Verification email sent' });
      } catch (error) {
        console.log(error.message);
        return next(error);
      }
    }
    return res
      .status(HttpCode.CONFLICT)
      .json({ message: 'Verification has already been passed' });
  }
  return res.status(HttpCode.NOT_FOUND).json({ message: 'User not found' });
};

module.exports = {
  signup,
  login,
  logout,
  сurrent,
  avatars,
  verificateEmail,
  resendVerificationEmail
};
