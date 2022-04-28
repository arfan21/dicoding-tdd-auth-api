import { Container } from 'instances-container';
import Hapi from '@hapi/hapi';
import users from '../../Interfaces/http/api/users';

const createServer = async (
    container: Container,
): Promise<Hapi.Server> => {
    const server = Hapi.server({
        host: process.env.HOST,
        port: process.env.PORT,
    });

    await server.register([
        {
            plugin: users,
            options: { container },
        },
    ]);

    return server;
};

export default createServer;
