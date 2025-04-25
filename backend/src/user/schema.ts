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
                id: { type: 'string' },
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
};

const deleteUserSchema = {
    description: 'delete a user',
    tags: ['user'],
    security: [{ bearerAuth: [] }],
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
};

export { getUsersSchema, addUserSchema, updateUserSchema, deleteUserSchema };