const Joi = require('joi');

const schemaLogIn = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const schemaSignUp = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().required()
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    next({ status: 400, message: `Field: ${err.message.replace(/"/g, '')}` });
  }
};

module.exports.validateLogIn = (req, _res, next) => {
  return validate(schemaLogIn, req.body, next);
};

module.exports.validateSignUp = (req, _res, next) => {
  return validate(schemaSignUp, req.body, next);
};
