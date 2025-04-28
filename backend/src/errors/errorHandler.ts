import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import NotFoundError from './NotFoundError'
import UnauthorizedError from './UnauthorizedError'
import { pinoLogger } from '../logger/pinoLogger'
import BadRequestError from './BadRequestError'

export function errorHandler(
    error: FastifyError | NotFoundError | UnauthorizedError | BadRequestError,
    request: FastifyRequest,
    reply: FastifyReply
) {
    const LOG_PREFIX = 'controller'

    if (error instanceof NotFoundError) {
        return reply.status(404).send({
            statusCode: 404,
            error: 'Not Found',
            message: error.message,
        })
    }

    if (error instanceof UnauthorizedError) {
        return reply.status(401).send({
            statusCode: 401,
            error: 'Unauthorized',
            message: error.message,
        })
    }

    if (error instanceof BadRequestError) {
        return reply.status(400).send({
            statusCode: 400,
            error: 'Bad request',
            message: error.message,
        })
    }

    if (error.code) {
        pinoLogger.error(`${LOG_PREFIX}`, { error })
        return reply.status(error.statusCode ?? 500).send({
            statusCode: error.statusCode ?? 500,
            error: 'Bad Request',
            message: error.message,
        })
    }

    return reply.status(500).send({
        statusCode: 500,
        error: 'Internal Server Error',
        message: 'Something went wrong',
    })
}
