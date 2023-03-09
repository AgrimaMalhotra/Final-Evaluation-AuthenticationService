const Joi = require('joi');
const reqBodySchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),  
});

module.exports = {reqBodySchema};