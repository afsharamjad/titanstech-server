const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().trim().email().lowercase().required(),
  password: Joi.string().trim().min(5).required(),
  firstName: Joi.string().trim().min(2).required().messages({
    "string.base": `firstNmae should be a type of text`,
    "string.empty": `firstname cannot be an empty field`,
    "string.min": `firstname should have a minimum length of 2`,
    "any.required": "firstname is a required field",
  }),
  lastName: Joi.string().trim().min(1).required(),
});

module.exports = registerSchema;
