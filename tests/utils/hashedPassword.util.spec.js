const {getHashedPassword, comparePassword} = require('../../src/utils/hashedPassword.util');
describe('Hashed Password', () => {
  describe('getHashedPassword', () => {
    it('should return hashed password', async () => {
      const hashedPassword = await getHashedPassword('test');
      expect(hashedPassword).not.toEqual('test');
    });
  });
  describe('comparePassword', () => {
    it('should return true if password matches', async () => {
      const hashedPassword = await getHashedPassword('test');
      const isPasswordMatched = await comparePassword('test', hashedPassword);
      expect(isPasswordMatched).toBeTruthy();
    });
    it('should return false if password does not match', async () => {
      const hashedPassword = await getHashedPassword('test');
      const isPasswordMatched = await comparePassword('test1', hashedPassword);
      expect(isPasswordMatched).not.toBeTruthy();
    });
  });
});