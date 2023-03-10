const {generateToken, verifyToken} = require('../../src/utils/jwtToken.util');

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockResolvedValueOnce('token'),
  verify: jest.fn().mockResolvedValueOnce({
    id: 1,
    email: 'test@gmail.com',
  })
}));
describe('JWT Token', () => {
  describe('Generate Token', () => {
    it('should generate token', () => {
      const payload = {
        id: 1,
        email: 'test@gmail.com',
      };
      const token = generateToken(payload);
      expect(token).not.toBeNull();
    });
  });
  describe('Verify Token',() => {
    it('should verify token', () => {
      const token='token';
      const decoded = verifyToken(token);
      expect(decoded).not.toBeNull;
    });
  });
});
