
const getUsersSchema = {
    description: 'retrieve all users',
    tags: ['user'],
    security: [{ bearerAuth: [] }],
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
};

const searchUsersSchema = {
    description: 'Retrieve all users with pagination',
    tags: ['user'],
    security: [{ bearerAuth: [] }],
    querystring: {
        type: 'object',
        properties: {
            page: { type: 'integer', default: 1, description: 'Page number' },
            pageSize: { type: 'integer', default: 10, description: 'Number of users per page' },
            sort: { type: 'string', description: 'sort type' },
            firstname: { type: 'string', description: 'Search users by firstname' },
            lastname: { type: 'string', description: 'Search users by lastname' },
            email: { type: 'string', description: 'Search users by email' },

        },
        required: [],
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                users: {
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
                },
                totalUsers: { type: 'integer', description: 'Total number of users' },
                totalPages: { type: 'integer', description: 'Total number of pages' },
            }
        }
    }
};

const addUserSchema = {
    description: 'add a user',
    tags: ['user'],
    security: [{ bearerAuth: [] }],
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
                id: { type: 'string', format: 'uuid' },
                firstname: { type: 'string' },
                lastname: { type: 'string' },
                email: { type: 'string', format: 'email' },
                birthdate: { type: 'string', format: 'date' },
            }
        }
    }
};

const updateUserSchema = {
    description: 'update a user',
    tags: ['user'],
    security: [{ bearerAuth: [] }],
    params: {
        type: 'object',
        properties: {
            id: { type: 'string', format: 'uuid' }
        },
        required: ['id']
    },
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
                id: { type: 'string', format: 'uuid' },
                firstname: { type: 'string' },
                lastname: { type: 'string' },
                email: { type: 'string', format: 'email' },
                birthdate: { type: 'string', format: 'date' },
            }
        }
    }
};

const deleteUserSchema = {
    description: 'delete a user',
    tags: ['user'],
    security: [{ bearerAuth: [] }],
    params: {
        type: 'object',
        properties: {
            id: { type: 'string', format: 'uuid' }
        },
        required: ['id']
    },
    response: {
        204: {
            description: 'User deleted successfully',
            type: 'null'
        }
    }
};

interface SearchUsersQuery {
    page: number;
    pageSize: number;
    sort?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
}

export { getUsersSchema, addUserSchema, updateUserSchema, deleteUserSchema, searchUsersSchema };
export type { SearchUsersQuery };