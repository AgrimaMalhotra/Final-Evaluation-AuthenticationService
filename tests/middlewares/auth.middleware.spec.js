const { validate } = require('../../src/middlewares/auth.middleware');
const http2Constants = require('http2').constants;
const schemas = require('../../src/schemas');

describe('Validate Middleware', () => {
  describe('Validate Request Body', () => {
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();
    it('should validate request body', async () => {
      const mockReq = {
        body: {
          name: 'test',
          email: 'test@gmail.com',
          password: 'test',
        },
      };
      validate(schemas.reqBodySchema)(mockReq, mockRes, mockNext);
      expect(mockNext).toBeCalled();
    });
    it('should throw error if request body is invalid', async () => {
      const mockReq = {
        body: {
          name: 'test',
          email: 2,
          password: 'test',
        },
      };
      validate(schemas.reqBodySchema)(mockReq, mockRes, mockNext);
      if (mockRes.status.mock.calls.length > 0) {
        expect(mockRes.status).toHaveBeenCalledWith(http2Constants.HTTP_STATUS_BAD_REQUEST);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Check request' });
      }
    });
    it('Should give error message if no body is passed', () => {
      const mockReq = {
        body: {},
      };
      validate(schemas.reqBodySchema)(mockReq, mockRes, mockNext);
      if (mockRes.status.mock.calls.length > 0) {
        expect(mockRes.status).toHaveBeenCalledWith(http2Constants.HTTP_STATUS_BAD_REQUEST);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Check request' });
      }
    });
  });
  describe('Validate Request Header', () => {
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();
    it('should validate request header', async () => {
      const mockReq = {
        headers: {
          authorization: 'Bearer test',
        },
      };
      validate(schemas.reqHeaderSchema)(mockReq, mockRes, mockNext);
      expect(mockNext).toBeCalled();
    });
    it('should throw error if request header is invalid', async () => {
      const mockReq = {
        headers:{
          authorization: '1234'
        }};
      validate(schemas.reqHeaderSchema)(mockReq, mockRes, mockNext);
      if (mockRes.status.mock.calls.length > 0) {
        expect(mockRes.status).toHaveBeenCalledWith(http2Constants.HTTP_STATUS_BAD_REQUEST);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Check request' });
      }
    });
    it('should throw error if request header is invalid', async () => {
      const mockReq = {
        headers:{
          authorization: 1
        }};
      validate(schemas.reqHeaderSchema)(mockReq, mockRes, mockNext);
      if (mockRes.status.mock.calls.length > 0) {
        expect(mockRes.status).toHaveBeenCalledWith(http2Constants.HTTP_STATUS_BAD_REQUEST);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Check request' });
      }
    });
    
  });
});

