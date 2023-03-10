const http2Constants = require('http2').constants;
const controller = require('../../src/controllers/auth.controller');
const service = require('../../src/services/auth.service');
const httpError = require('../../src/exceptions/auth.exception');

describe('Auth Controller', () => {
  describe('register', () => {
    const mockReq = {
      body: {
        name: 'test',
        email: 'test@gmail.com',
        password: 'test',
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    it('should register a user', async () => {
      const mockResult= {
        name: 'test',
        email: 'test@gmail.com',
        password: 'test',
      };
      jest.spyOn(service, 'register').mockResolvedValue(mockResult);
      await controller.register(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(http2Constants.HTTP_STATUS_CREATED);
      expect(mockRes.json).toBeCalledWith(mockResult);
    });
    it('Should return 500 if registration fails', async () => {
      jest.spyOn(service, 'register').mockResolvedValue();
      await controller.register(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
      expect(mockRes.json).toBeCalledWith({ message: 'Failed to register user' });
    });
  });
  describe('login', () => {
    const mockReq = {
      body: {
        email: 'test@gmail.com',
        password: 'test'
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    it('should login a user', async () => {
      const mockResult= {
        token: 'testjwtToken'};
      jest.spyOn(service, 'login').mockResolvedValue(mockResult);
      await controller.login(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(http2Constants.HTTP_STATUS_OK);
      expect(mockRes.json).toBeCalledWith(mockResult);
    });
    it('Should return 500 if login fails', async () => {
      jest.spyOn(service, 'login').mockResolvedValue();
      await controller.login(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
      expect(mockRes.json).toBeCalledWith({ message: 'Failed to login' });
    });
  });
  describe('verify', () => {
    const mockReq = {
      headers: {
        authorization: 'Bearer testjwtToken'}};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    it('should verify a user', async () => {
      jest.spyOn(service, 'verify').mockResolvedValue();
      await controller.verify(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(http2Constants.HTTP_STATUS_OK);
      expect(mockRes.json).toBeCalledWith({'data': undefined, 'message': 'Verified successfully !'});
    }
    );
    it('Should return 500 if verification fails', async () => {
      jest.spyOn(service, 'verify').mockRejectedValue(new httpError('Invalid token', http2Constants.HTTP_STATUS_BAD_REQUEST));
      await controller.verify(mockReq, mockRes);
      expect(service.verify).toHaveBeenCalledWith('testjwtToken');
      expect(mockRes.status).toHaveBeenCalledWith(http2Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid token' });
    });
  });
});

