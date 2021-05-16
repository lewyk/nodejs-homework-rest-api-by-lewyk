const Joi = require('joi');

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().optional(),
  phone: Joi.number().optional(),
  favorite: Joi.boolean().optional()
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.number().optional(),
  favorite: Joi.boolean().optional()
});

const schemaUpdateFavorite = Joi.object({
  favorite: Joi.boolean().required()
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    next({ status: 400, message: `Field: ${err.message.replace(/"/g, '')}` });
  }
};

module.exports.validateCreateContact = (req, _res, next) => {
  return validate(schemaCreateContact, req.body, next);
};

module.exports.validateUpdateContact = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};

module.exports.validateUpdateFavorite = (req, _res, next) => {
  return validate(schemaUpdateFavorite, req.body, next);
};
