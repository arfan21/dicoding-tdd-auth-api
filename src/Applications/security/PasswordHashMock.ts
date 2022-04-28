import PasswordHashInterface from './PasswordHashInterface';

class PasswordHashMock implements PasswordHashInterface {
    async hash(password: string): Promise<string> {
        throw new Error('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
    }
}

export default PasswordHashMock;
