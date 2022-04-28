import { Pool } from 'pg';
import InvariantError from '../../Commons/exceptions/InvariantError';
import RegisteredUser from '../../Domains/users/entities/RegisteredUser';
import { RegisteredUserPayload } from '../../Domains/users/entities/RegisteredUser.types';
import { RegisterUserPayload } from '../../Domains/users/entities/RegisterUser.types';
import UserRepositoryInterface from '../../Domains/users/UserRepositoryInterface';

class UserRepositoryPostgres implements UserRepositoryInterface {
    public pool: Pool;
    public idGenerator: () => string;

    constructor(pool: Pool, idGenerator: () => string) {
        this.pool = pool;
        this.idGenerator = idGenerator;
    }

    async addUser(
        user: RegisterUserPayload,
    ): Promise<RegisteredUser> {
        const { username, password, fullname } = user;
        const id = `user-${this.idGenerator()}`;

        const query = {
            text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id, username, fullname',
            values: [id, username, password, fullname],
        };

        const result = await this.pool.query<RegisteredUserPayload>(
            query,
        );

        return new RegisteredUser({ ...result.rows[0] });
    }

    async verifyAvailableUsername(username: string): Promise<void> {
        const query = {
            text: 'SELECT username FROM users WHERE username = $1',
            values: [username],
        };

        const result = await this.pool.query(query);

        if (result.rowCount) {
            throw new InvariantError('username tidak tersedia');
        }
    }
}

export default UserRepositoryPostgres;
