/* istanbul ignore file */

import { createContainer } from 'instances-container';

// external agency
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import pool from './database/postgres/pool';

// service (repository, helper, manager, etc)
import UserRepositoryPostgres from './repository/UserRepositoryPostgres';
import BcryptPasswordHash from './security/BcryptPasswordHash';

// use case
import AddUserUseCase from '../Applications/use_case/AddUserUseCase';
import UserRepositoryInterface from '../Domains/users/UserRepositoryInterface';
import PasswordHashInterface from '../Applications/security/PasswordHashInterface';

export const UserRepositoryInterfaceName = 'UserRepositoryInterface';
export const PasswordHashInterfaceName = 'PasswordHashInterface';

// creating container
const container = createContainer();

// registering services and repository
container.register([
    {
        key: UserRepositoryInterfaceName,
        Class: UserRepositoryPostgres,
        parameter: {
            dependencies: [
                {
                    concrete: pool,
                },
                {
                    concrete: nanoid,
                },
            ],
        },
    },
    {
        key: PasswordHashInterfaceName,
        Class: BcryptPasswordHash,
        parameter: {
            dependencies: [
                {
                    concrete: bcrypt,
                },
            ],
        },
    },
]);

container.register([
    {
        key: AddUserUseCase.name,
        Class: AddUserUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'userRepository',
                    internal: UserRepositoryInterfaceName,
                },
                {
                    name: 'passwordHash',
                    internal: PasswordHashInterfaceName,
                },
            ],
        },
    },
]);

export default container;
