import PasswordHashMock from '../PasswordHashMock';

describe('PasswordHash interface', () => {
    it('should throw error when invoke abstract behavior', async () => {
        // Arrange
        const passwordHash = new PasswordHashMock();
        // Action & Assert
        await expect(
            passwordHash.hash('dummy_password'),
        ).rejects.toThrowError(
            'PASSWORD_HASH.METHOD_NOT_IMPLEMENTED',
        );
    });
});
