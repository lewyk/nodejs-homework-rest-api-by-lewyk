const User = require('./schemas/user');

const findById = async (id) => {
  return await User.findOne({ _id: id });
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const create = async (options) => {
  const user = new User(options);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateAvatar = async (id, avatar, userIdImg = null) => {
  return await User.updateOne({ _id: id }, { avatarURL: avatar, userIdImg });
};

const getUserByVerificationToken = async (token) => {
  return await User.findOne({ verificationToken: token });
};

const updateVerificationToken = async (id, isVerificated, token) => {
  return await User.updateOne(
    { _id: id },
    { isVerificated, verificationToken: token }
  );
};

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  updateAvatar,
  updateVerificationToken,
  getUserByVerificationToken
};
