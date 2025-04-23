import { FastifyInstance } from 'fastify'

export default function healthRoutes(app: FastifyInstance) {
    app.get('/health-check', {
        schema: {
            description: 'Health check endpoint',
            tags: ['health'],
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        status: { type: 'string' }
                    }
                }
            }
        }
    }, (request, reply) => {
        return { status: 'ok' }
    });
}