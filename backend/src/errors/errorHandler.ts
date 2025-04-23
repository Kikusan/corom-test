import { FastifyReply, FastifyRequest } from 'fastify'
import NotFoundError from './NotFoundError'

export function errorHandler(
    error: Error,
    request: FastifyRequest,
    reply: FastifyReply
) {

    if (error instanceof NotFoundError) {
        return reply.status(404).send({
            statusCode: 404,
            error: 'Not Found',
            message: error.message,
        })
    }

    return reply.status(500).send({
        statusCode: 500,
        error: 'Internal Server Error',
        message: 'Something went wrong',
    })
}
