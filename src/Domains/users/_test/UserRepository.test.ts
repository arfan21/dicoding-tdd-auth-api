import RegisterUser from '../entities/RegisterUser';
import UserRepositoryMock from '../UserRepositoryMock';

describe('UserRepository interface', () => {
    it('should throw error when invoke abstract behavior', async () => {
        // Arrange
        const userRepository = new UserRepositoryMock();
        const payload = {} as RegisterUser;
        // Action and Assert
        await expect(
            userRepository.addUser(payload),
        ).rejects.toThrowError(
            'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED',
        );
        await expect(
            userRepository.verifyAvailableUsername(''),
        ).rejects.toThrowError(
            'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED',
        );
    });
});
