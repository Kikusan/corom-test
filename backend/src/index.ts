import Fastify from 'fastify';
import cors from '@fastify/cors'


import healthRoutes from './routes/health-check';
import swaggerRoute from './routes/swagger';
import userRoutes from './user/routes';

const app = Fastify({
    logger: true
});
app.register(cors, {
    origin: true,
})
swaggerRoute(app)
app.register(healthRoutes)
app.register(userRoutes, { prefix: '/user' })

const start = async () => {
    try {
        const PORT = parseInt(process.env.PORT ?? '3000');
        const HOST = process.env.HOST ?? '0.0.0.0'
        await app.listen({ port: PORT, host: HOST });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();