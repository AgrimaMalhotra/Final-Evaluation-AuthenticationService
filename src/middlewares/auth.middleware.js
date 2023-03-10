const http2Constants = require('http2').constants;
const httpError = require('../exceptions/auth.exception');
const validate = (reqSchema, reqProperty) => {
  return (req, res, next) => {
    try{
      const { error } = reqSchema.validate(req[reqProperty]);
      if (error) {
        throw new httpError('Check request', http2Constants.HTTP_STATUS_BAD_REQUEST);
      }
      next();
    }
    catch(err){
      res.status(err.status).json({message:err.message});}
  };};

module.exports = { validate };