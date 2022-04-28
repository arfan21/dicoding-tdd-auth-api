import RegisteredUser from '../RegisteredUser';
import { RegisteredUserPayload } from '../RegisteredUser.types';

describe('a RegisteredUser entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload: RegisteredUserPayload = {
            id: '',
            username: 'dicoding',
            fullname: 'Dicoding Indonesia',
        };

        // Action and Assert
        expect(() => new RegisteredUser(payload)).toThrowError(
            'REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY',
        );
    });

    it('should create registeredUser object correctly', () => {
        // Arrange
        const payload: RegisteredUserPayload = {
            id: 'user-123',
            username: 'dicoding',
            fullname: 'Dicoding Indonesia',
        };

        // Action
        const registeredUser = new RegisteredUser(payload);

        // Assert
        expect(registeredUser.id).toEqual(payload.id);
        expect(registeredUser.username).toEqual(payload.username);
        expect(registeredUser.fullname).toEqual(payload.fullname);
    });
});
