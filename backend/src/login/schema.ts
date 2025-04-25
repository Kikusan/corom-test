// src/login/schema.ts
export const loginSchema = {
    body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
            username: { type: 'string' },
            password: { type: 'string' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                token: { type: 'string' }
            }
        },
        401: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    },
    tags: ['auth']
};
