const service = require('../services/auth.service');
const http2Constants= require('http2').constants;
const httpError = require('../exceptions/auth.exception');

const register = async (req, res) => {
  const userDetails = req.body;
  try {
    const result = await service.register(userDetails);
    if(!result){
      throw new httpError('Failed to register user',http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    }
    res.status(http2Constants.HTTP_STATUS_CREATED).json(result);
  }catch (error) {
    res.status(http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({message: error.message});
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await service.login(email, password);
    if(!result){
      throw new httpError('Failed to login',http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
    }
    res.status(http2Constants.HTTP_STATUS_OK).json(result);
  }catch (error) {
    res.status(http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({message: error.message});
  }
};

const verify = async (req, res) => {
  const token  = req.headers.authorization;
  try {
    const decoded = await service.verify(token.split(' ')[1]);
    res.status(http2Constants.HTTP_STATUS_OK).json({message: 'Verified successfully !', data: decoded});
  }catch (error) {
    res.status(http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({message: error.message});
  }
};

module.exports = { register, login, verify };