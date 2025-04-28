import { FastifyInstance } from 'fastify'
import UserService, { Search } from './service';
import FakeUserRepository from './repositories/FakeUserRepository';
import KnexUserRepository from './repositories/KnexUserRepository';
import { IUserRepository, NewUser } from './repositories/IUserRepository';
import { addUserSchema, deleteUserSchema, getUsersSchema, searchUsersSchema, updateUserSchema } from './schema';
import { pinoLogger } from '../logger/pinoLogger';


export default function createUserRoutes(mock: boolean = false) {
    let userRepository: IUserRepository = new KnexUserRepository(pinoLogger);

    if (mock) {
        userRepository = new FakeUserRepository(pinoLogger);
    }
    const userService = new UserService(userRepository, pinoLogger);

    return async function userRoutes(app: FastifyInstance) {
        app.get('/', {
            preHandler: [app.authenticate],
            schema: getUsersSchema
        }, async (request, reply) => {
            const users = await userService.getUsers();
            return reply.code(200).send(users);
        });

        app.get('/search', {
            preHandler: [app.authenticate],
            schema: searchUsersSchema
        }, async (request, reply) => {
            const { page, pageSize } = request.query as Search;
            const users = await userService.searchUsers({ page, pageSize });
            return reply.code(200).send(users);
        });

        app.post('/', {
            preHandler: [app.authenticate],
            schema: addUserSchema
        }, async (request, reply) => {
            const { firstname, lastname, email, birthdate } = request.body as NewUser;
            const user = await userService.addUser({ firstname, lastname, email, birthdate });
            return reply.code(201).send(user);
        });

        app.put('/:id', {
            preHandler: [app.authenticate],
            schema: updateUserSchema
        }, async (request, reply) => {
            const { id } = request.params as { id: string }
            const { firstname, lastname, email, birthdate } = request.body as NewUser;
            const user = await userService.updateUser({ id, firstname, lastname, email, birthdate });
            return reply.code(200).send(user);
        });

        app.delete('/:id', {
            preHandler: [app.authenticate],
            schema: deleteUserSchema
        }, async (request, reply) => {
            const { id } = request.params as { id: string }

            await userService.deleteUser(id)

            return reply.code(204).send()
        })
    }
};