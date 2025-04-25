import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import cors from '@fastify/cors'

import healthRoutes from './routes/health-check';
import swaggerRoute from './routes/swagger';
import createUserRoutes from './user/routes';
import { errorHandler } from './errors/errorHandler';
import authRoutes from './login/routes';
import UnauthorizedError from './errors/UnauthorizedError';

export function createApp(fake: boolean = false) {
    const app = Fastify({
        logger: true,
        ajv: {
            customOptions: {
                allErrors: true,
            },
        },
    });

    app.register(fastifyJwt, {
        secret: process.env.JWT_SECRET ?? 'supersecret',
    });

    app.decorate('authenticate', async function (request: any, reply: any) {
        try {
            await request.jwtVerify()
        } catch (err: any) {
            if (err.statusCode === 401) {
                throw new UnauthorizedError('Unauthorized')
            }
            throw err
        }
    })

    app.register(cors, {
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
    swaggerRoute(app)
    app.register(healthRoutes)
    app.register(createUserRoutes(fake), { prefix: '/user' })
    app.register(authRoutes, { prefix: '/auth' })
    app.setErrorHandler(errorHandler)
    return app;
}
