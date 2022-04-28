import PasswordHashInterface from '../../Applications/security/PasswordHashInterface';

class BcryptPasswordHash implements PasswordHashInterface {
    private bcrypt: typeof import('bcrypt');
    private saltRound: number;

    constructor(bcrypt: typeof import('bcrypt'), saltRound = 10) {
        this.bcrypt = bcrypt;
        this.saltRound = saltRound;
    }

    async hash(password: string): Promise<string> {
        return this.bcrypt.hash(password, this.saltRound);
    }
}

export default BcryptPasswordHash;
