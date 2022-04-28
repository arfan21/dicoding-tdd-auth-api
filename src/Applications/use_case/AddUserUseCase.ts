import RegisteredUser from '../../Domains/users/entities/RegisteredUser';
import RegisterUser from '../../Domains/users/entities/RegisterUser';
import { RegisterUserPayload } from '../../Domains/users/entities/RegisterUser.types';
import UserRepositoryInterface from '../../Domains/users/UserRepositoryInterface';
import PasswordHashInterface from '../security/PasswordHashInterface';

class AddUserUseCase {
    private userRepository: UserRepositoryInterface;
    private passwordHash: PasswordHashInterface;

    constructor(param: {
        userRepository: UserRepositoryInterface;
        passwordHash: PasswordHashInterface;
    }) {
        this.userRepository = param.userRepository;
        this.passwordHash = param.passwordHash;
    }

    async execute(
        payload: RegisterUserPayload,
    ): Promise<RegisteredUser> {
        const registerUser = new RegisterUser(payload);
        await this.userRepository.verifyAvailableUsername(
            payload.username,
        );
        registerUser.password = await this.passwordHash.hash(
            registerUser.password,
        );
        return await this.userRepository.addUser(registerUser);
    }
}

export default AddUserUseCase;
