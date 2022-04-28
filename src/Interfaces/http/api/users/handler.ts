// import { Request } from '@hapi/hapi';
import { Request, ResponseToolkit } from '@hapi/hapi';
import { Container } from 'instances-container';
import AddUserUseCase from '../../../../Applications/use_case/AddUserUseCase';
import DomainErrorTranslator from '../../../../Commons/exceptions/DomainErrorTranslator';
import InvariantError from '../../../../Commons/exceptions/InvariantError';
import { RegisterUserPayload } from '../../../../Domains/users/entities/RegisterUser.types';

class UsersHandler {
    private container: Container;
    constructor(container: Container) {
        this.container = container;

        this.postUserHandler = this.postUserHandler.bind(this);
    }

    async postUserHandler(request: Request, h: ResponseToolkit) {
        try {
            const addUserUseCase = this.container.getInstance(
                AddUserUseCase.name,
            ) as AddUserUseCase;
            console.log('before:', request.payload);
            const payload = request.payload as RegisterUserPayload;
            console.log(payload);

            const addedUser = await addUserUseCase.execute(payload);

            const response = h.response({
                status: 'success',
                data: {
                    addedUser,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof Error) {
                const translatedError =
                    DomainErrorTranslator.translate(error);
                const response = h.response({
                    status: 'fail',
                    message: translatedError.message,
                });
                if (translatedError instanceof InvariantError)
                    response.code(translatedError.statusCode);
                else response.code(500);
                return response;
            }
        }
    }
}

export default UsersHandler;
