const Joi= require('joi');
const reqHeaderSchema = Joi.object({
  authorization: Joi.string().required(),
}).unknown(true);

module.exports = {reqHeaderSchema};
