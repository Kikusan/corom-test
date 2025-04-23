import { FastifyInstance } from 'fastify'
import UserService from './service';
import FakeUserRepository from './repositories/FakeUserRepository';
import KnexUserRepository from './repositories/KnexUserRepository';
import { IUserRepository, NewUser } from './repositories/IUserRepository';


export default function createUserRoutes(mock: boolean = false) {
    let userRepository: IUserRepository = new KnexUserRepository();

    if (mock) {
        userRepository = new FakeUserRepository();
    }
    const userService = new UserService(userRepository);

    return async function userRoutes(app: FastifyInstance) {
        app.get('/', {
            schema: {
                description: 'retrieve all users',
                tags: ['user'],
                response: {
                    200: {
                        description: 'Successful response',
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                firstname: { type: 'string' },
                                lastname: { type: 'string' },
                                email: { type: 'string', format: 'email' },
                                birthdate: { type: 'string', format: 'date' },
                            },
                        }
                    }
                }
            }
        }, async (request, reply) => {
            const users = await userService.getUsers();
            return reply.code(200).send(users);
        });

        app.post('/', {
            schema: {
                description: 'add a user',
                tags: ['user'],
                body: {
                    type: 'object',
                    properties: {
                        firstname: { type: 'string' },
                        lastname: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        birthdate: { type: 'string', format: 'date' },
                    },
                    required: ['firstname', 'lastname', 'email', 'birthdate'],
                },
                response: {
                    201: {
                        description: 'User created successfully',
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            firstname: { type: 'string' },
                            lastname: { type: 'string' },
                            email: { type: 'string', format: 'email' },
                            birthdate: { type: 'string', format: 'date' },
                        }
                    }
                }
            }
        }, async (request, reply) => {
            const { firstname, lastname, email, birthdate } = request.body as NewUser;
            const user = await userService.addUser({ firstname, lastname, email, birthdate });
            return reply.code(201).send(user);
        });

        app.put('/:id', {
            schema: {
                description: 'update a user',
                tags: ['user'],
                body: {
                    type: 'object',
                    properties: {
                        firstname: { type: 'string' },
                        lastname: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        birthdate: { type: 'string', format: 'date' },
                    },
                    required: ['firstname', 'lastname', 'email', 'birthdate'],
                },
                response: {
                    200: {
                        description: 'User created successfully',
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            firstname: { type: 'string' },
                            lastname: { type: 'string' },
                            email: { type: 'string', format: 'email' },
                            birthdate: { type: 'string', format: 'date' },
                        }
                    }
                }
            }
        }, async (request, reply) => {
            const { id } = request.params as { id: string }
            const { firstname, lastname, email, birthdate } = request.body as NewUser;
            const user = await userService.updateUser({ id, firstname, lastname, email, birthdate });
            return reply.code(200).send(user);
        });

        app.delete('/:id', {
            schema: {
                description: 'delete a user',
                tags: ['user'],
                params: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' }
                    },
                    required: ['id']
                },
                response: {
                    204: {
                        description: 'User deleted successfully',
                        type: 'null'
                    }
                }
            }
        }, async (request, reply) => {
            const { id } = request.params as { id: string }

            await userService.deleteUser(id)

            return reply.code(204).send()
        })
    }
};