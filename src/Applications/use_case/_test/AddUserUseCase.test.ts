import RegisteredUser from '../../../Domains/users/entities/RegisteredUser';
import RegisterUser from '../../../Domains/users/entities/RegisterUser';
import { RegisterUserPayload } from '../../../Domains/users/entities/RegisterUser.types';
import UserRepositoryMock from '../../../Domains/users/UserRepositoryMock';
import PasswordHashMock from '../../security/PasswordHashMock';
import AddUserUseCase from '../AddUserUseCase';

describe('AddUserUseCase', () => {
    it('should orchestrating the add user action correctly', async () => {
        // Arrange
        const useCasePayload: RegisterUserPayload = {
            username: 'dicoding',
            password: 'secret',
            fullname: 'Dicoding Indonesia',
        };
        const expectedRegisteredUser = new RegisteredUser({
            id: 'user-123',
            username: useCasePayload.username,
            fullname: useCasePayload.fullname,
        });

        /** creating dependency of use case */
        const mockUserRepository = new UserRepositoryMock();
        const mockPasswordHash = new PasswordHashMock();

        /** mocking needed function */
        mockUserRepository.verifyAvailableUsername = jest
            .fn()
            .mockImplementation(() => Promise.resolve());
        mockPasswordHash.hash = jest
            .fn()
            .mockImplementation(() =>
                Promise.resolve('encrypted_password'),
            );
        mockUserRepository.addUser = jest
            .fn()
            .mockImplementation(() =>
                Promise.resolve(expectedRegisteredUser),
            );

        /** creating use case instance */
        const getUserUseCase = new AddUserUseCase({
            userRepository: mockUserRepository,
            passwordHash: mockPasswordHash,
        });

        // Action
        const registeredUser = await getUserUseCase.execute(
            useCasePayload,
        );

        // Assert
        expect(registeredUser).toStrictEqual(expectedRegisteredUser);
        expect(
            mockUserRepository.verifyAvailableUsername,
        ).toBeCalledWith(useCasePayload.username);
        expect(mockPasswordHash.hash).toBeCalledWith(
            useCasePayload.password,
        );
        expect(mockUserRepository.addUser).toBeCalledWith(
            new RegisterUser({
                username: useCasePayload.username,
                password: 'encrypted_password',
                fullname: useCasePayload.fullname,
            }),
        );
    });
});
