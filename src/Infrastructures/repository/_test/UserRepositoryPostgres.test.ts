import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper';
import RegisteredUser from '../../../Domains/users/entities/RegisteredUser';
import RegisterUser from '../../../Domains/users/entities/RegisterUser';
import pool from '../../database/postgres/pool';
import UserRepositoryPostgres from '../UserRepositoryPostgres';
import InvariantError from '../../../Commons/exceptions/InvariantError';

const fakeIdGenerator = () => '123'; // stub!

describe('UserReposistoryPostgres', () => {
    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('verifyAvailableUsername function', () => {
        it('should throw InvariantError when username not available', async () => {
            // Arrange
            await UsersTableTestHelper.addUser({
                username: 'dicoding',
            }); // memasukan user baru dengan username dicoding
            const userRepositoryPostgres = new UserRepositoryPostgres(
                pool,
                fakeIdGenerator,
            );

            // Action & Assert
            await expect(
                userRepositoryPostgres.verifyAvailableUsername(
                    'dicoding',
                ),
            ).rejects.toThrowError(InvariantError);
        });

        it('should not throw InvariantError when username available', async () => {
            // Arrange
            const userRepositoryPostgres = new UserRepositoryPostgres(
                pool,
                fakeIdGenerator,
            );

            // Action & Assert
            await expect(
                userRepositoryPostgres.verifyAvailableUsername(
                    'dicoding',
                ),
            ).resolves.not.toThrowError(InvariantError);
        });
    });

    describe('addUser function', () => {
        it('should persist register user', async () => {
            // Arrange
            const registerUser = new RegisterUser({
                username: 'dicoding',
                password: 'secret_password',
                fullname: 'Dicoding Indonesia',
            });

            const userRepositoryPostgres = new UserRepositoryPostgres(
                pool,
                fakeIdGenerator,
            );

            // Action
            await userRepositoryPostgres.addUser(registerUser);

            // Assert
            const users = await UsersTableTestHelper.findUsersById(
                'user-123',
            );
            expect(users).toHaveLength(1);
        });

        it('should return registered user correctly', async () => {
            // Arrange
            const registerUser = new RegisterUser({
                username: 'dicoding',
                password: 'secret_password',
                fullname: 'Dicoding Indonesia',
            });
            const fakeIdGenerator = () => '123'; // stub!
            const userRepositoryPostgres = new UserRepositoryPostgres(
                pool,
                fakeIdGenerator,
            );

            // Action
            const registeredUser =
                await userRepositoryPostgres.addUser(registerUser);

            // Assert
            expect(registeredUser).toStrictEqual(
                new RegisteredUser({
                    id: 'user-123',
                    username: 'dicoding',
                    fullname: 'Dicoding Indonesia',
                }),
            );
        });
    });
});
