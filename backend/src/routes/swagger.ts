import { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui'


export default function swaggerRoute(app: FastifyInstance) {
    app.register(swagger, {
        swagger: {
            info: {
                title: 'Fastify API',
                description: 'Testing the Fastify swagger API',
                version: '0.1.0'
            },
            host: `${process.env.HOST}:${process.env.PORT}`,
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json']
        }
    });

    app.register(swaggerUi, {
        routePrefix: '/documentation'
    });
}