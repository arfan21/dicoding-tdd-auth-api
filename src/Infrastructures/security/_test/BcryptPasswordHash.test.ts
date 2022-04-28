import BcryptPasswordHash from '../BcryptPasswordHash';
import bcrypt from 'bcrypt';

describe('BcryptPasswordHash', () => {
    describe('hash function', () => {
        it('should encrypt password correctly', async () => {
            // Arrange
            const spyHash = jest.spyOn(bcrypt, 'hash');
            const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

            // Action
            const encryptedPassword = await bcryptPasswordHash.hash(
                'plain_password',
            );

            // Assert
            expect(typeof encryptedPassword).toEqual('string');
            expect(encryptedPassword).not.toEqual('plain_password');
            expect(spyHash).toBeCalledWith('plain_password', 10); // 10 adalah nilai saltRound default untuk BcryptPasswordHash
        });
    });
});
