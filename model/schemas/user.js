const mongoose = require('mongoose');
const { Schema } = mongoose;
const gravatar = require('gravatar');
const { Subscription } = require('../../helpers/constants');
const bcrypt = require('bcryptjs');
const SALT_FACTOR = 6;
const { v4: uuidv4 } = require('uuid');

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: 'Guest'
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    subscription: {
      type: String,
      enum: [Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS],
      default: Subscription.STARTER
    },
    token: {
      type: String,
      default: null
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: 250 }, true);
      }
    },
    userIdImg: {
      type: String,
      default: null
    },
    isVerificated: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String,
      required: true,
      default: uuidv4()
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(String(password), this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
