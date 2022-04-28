import RegisteredUser from './entities/RegisteredUser';
import { RegisterUserPayload } from './entities/RegisterUser.types';
import UserRepositoryInterface from './UserRepositoryInterface';

class UserRepositoryMock implements UserRepositoryInterface {
    public async addUser(
        user: RegisterUserPayload,
    ): Promise<RegisteredUser> {
        throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    public async verifyAvailableUsername(
        username: string,
    ): Promise<void> {
        throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
}

export default UserRepositoryMock;
