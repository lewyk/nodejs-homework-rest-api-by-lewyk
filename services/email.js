const Mailgen = require('mailgen');
const config = require('../config/config');

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case 'development':
        this.link = 'http://localhost:3000';
        break;
      case 'production':
        this.link = config.linksToServer;

        break;
      default:
        this.link = 'http://localhost:3000';
        break;
    }
  }

  #createTemplateVerifyEmail(token, name = 'Guest') {
    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'System Contacts',
        link: this.link
      }
    });
    const email = {
      body: {
        name,
        intro:
          "Welcome to System Contacts! We're very excited to have you on board.",
        action: {
          instructions:
            'To get started with System Contacts, please click here:',
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${token}`
          }
        }
      }
    };

    return mailGenerator.generate(email);
  }

  async sendVerifyPasswordEmail(token, email, name) {
    const emailBody = this.#createTemplateVerifyEmail(token, name);
    await this.sender.send({
      to: email,
      subject: 'Verify your account',
      html: emailBody
    });
  }
}

module.exports = EmailService;
