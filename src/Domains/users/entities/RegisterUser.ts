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

        if (payload.username.length > 50) {
            throw new Error('REGISTER_USER.USERNAME_LIMIT_CHAR');
        }

        if (!payload.username.match(/^[a-zA-Z1-9_]+$/)) {
            throw new Error(
                'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER',
            );
        }

        if (
            typeof payload.username !== 'string' ||
            typeof payload.password !== 'string' ||
            typeof payload.fullname !== 'string'
        ) {
            throw new Error(
                'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION',
            );
        }

        this.username = payload.username;
        this.password = payload.password;
        this.fullname = payload.fullname;
    }
}

export default RegisterUser;
