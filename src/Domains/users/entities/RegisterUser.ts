import { RegisterUserPayload } from './RegisterUser.types';

class RegisterUser {
    public username: string;
    public password: string;
    public fullname: string;

    constructor(payload: RegisterUserPayload) {
        if (
            !payload.username ||
            !payload.password ||
            !payload.fullname
        ) {
            throw new Error(
                'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY',
            );
        }

        this.username = payload.username;
        this.password = payload.password;
        this.fullname = payload.fullname;
    }
}

export default RegisterUser;
