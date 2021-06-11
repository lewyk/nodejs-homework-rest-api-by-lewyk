const nodemailer = require('nodemailer');
const config = require('../config/config');

require('dotenv').config();

class CreateSenderNodemailer {
  async send(msg) {
    const options = {
      host: config.email.smtpServer,
      port: config.email.port,
      secure: true,
      auth: {
        user: config.email.nodemailer,
        pass: process.env.MAIL_PASSWORD
      }
    };

    const transporter = nodemailer.createTransport(options);
    const emailOptions = {
      from: config.email.nodemailer,
      ...msg
    };

    return await transporter.sendMail(emailOptions);
  }
}

module.exports = { CreateSenderNodemailer };
