import RegisteredUser from './entities/RegisteredUser';
import { RegisterUserPayload } from './entities/RegisterUser.types';

interface UserRepositoryInterface {
    addUser(user: RegisterUserPayload): Promise<RegisteredUser>;
    verifyAvailableUsername(username: string): Promise<void>;
}

export default UserRepositoryInterface;
