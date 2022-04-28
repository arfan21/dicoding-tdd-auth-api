import { RegisteredUserPayload } from './RegisteredUser.types';

class RegisteredUser {
    public id: string;
    public username: string;
    public fullname: string;

    constructor(payload: RegisteredUserPayload) {
        this._verifyPayload(payload);

        this.id = payload.id;
        this.username = payload.username;
        this.fullname = payload.fullname;
    }

    _verifyPayload({
        id,
        username,
        fullname,
    }: RegisteredUserPayload) {
        if (!id || !username || !fullname) {
            throw new Error(
                'REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY',
            );
        }

        if (
            typeof id !== 'string' ||
            typeof username !== 'string' ||
            typeof fullname !== 'string'
        ) {
            throw new Error(
                'REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION',
            );
        }
    }
}

export default RegisteredUser;
