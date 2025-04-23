import Fastify from 'fastify';
import cors from '@fastify/cors'

import healthRoutes from './routes/health-check';
import swaggerRoute from './routes/swagger';
import createUserRoutes from './user/routes';
import { errorHandler } from './errors/errorHandler';

export function createApp(fake: boolean = false) {
    const app = Fastify({
        logger: true
    });
    app.register(cors, {
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
    swaggerRoute(app)
    app.register(healthRoutes)
    app.register(createUserRoutes(fake), { prefix: '/user' })
    app.setErrorHandler(errorHandler)
    return app;
}
