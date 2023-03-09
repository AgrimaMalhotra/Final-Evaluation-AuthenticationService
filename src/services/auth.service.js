const models= require('../../database/models');
const {getHashedPassword,comparePassword} = require('../utils/hashedPassword.util');
const {generateToken,verifyToken} = require('../utils/jwtToken.util');
const http2Constants = require('http2').constants;
const httpError = require('../exceptions/auth.exception');
const redis = require('redis');

const config = {
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};

const client = redis.createClient(config);
client.connect();

const register = async (userDetails) => {
  const {name, email,password} = userDetails;
  if(! await models.user.findOne({where:{email}})){
    const hashedPassword = await getHashedPassword(password);
    const user = await models.user.create({name, email,password:hashedPassword});
    return user;}
  throw new httpError('User already exists',http2Constants.HTTP_STATUS_BAD_REQUEST);
};

const login = async (email, password) => {
  const user = await models.user.findOne({ where: { email } });
  if (!user) {
    throw new httpError('User not found', http2Constants.HTTP_STATUS_NOT_FOUND);
  }
  const isPasswordValid = await comparePassword(password, user.password);
  if (isPasswordValid === false) {
    throw new httpError('Invalid password', http2Constants.HTTP_STATUS_BAD_REQUEST);
  }
  const token = generateToken({id:user.id, email:user.email});
  await client.set(token,'');
  return {token};
};

const verify = async(token) => {
  const decoded = verifyToken(token);
  const tokenFromRedis = await client.get(token);
  if(tokenFromRedis!==undefined){
    return decoded;
  }
  else throw new httpError('Invalid token',http2Constants.HTTP_STATUS_BAD_REQUEST);
};

module.exports = {register,login,verify};
