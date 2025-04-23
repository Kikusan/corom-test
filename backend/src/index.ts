import Fastify from 'fastify';
import healthRoutes from './routes/home';

const app = Fastify({
    logger: true
});

app.get('/', async (request, reply) => {
    return { hello: 'coucou' };
});

app.register(healthRoutes)
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