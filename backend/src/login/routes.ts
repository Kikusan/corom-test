// src/routes/auth.ts
import { FastifyInstance } from 'fastify'
import { loginSchema } from './schema'
import LoginService from './service'
import FakeLoginUserRepository from './repositories/FakeLoginUserRepository'

const loginUserRepository = new FakeLoginUserRepository
const loginService = new LoginService(loginUserRepository)
export default async function authRoutes(fastify: FastifyInstance) {
    fastify.post('/login', {
        schema: loginSchema,
    }, async (request, reply) => {
        const { username, password } = request.body as any
        const isAllowed = await loginService.isAllowed({ username, password })
        if (isAllowed) {
            const token = fastify.jwt.sign({ username })
            return { token }
        }

        return reply.status(401).send({ message: 'Unauthorized' })
    })
}
