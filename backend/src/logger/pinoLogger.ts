import pino from 'pino';
import { ILogger } from './ILogger'
const pinoInstance = pino({
    level: 'debug',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
        },
    },
});

export const pinoLogger: ILogger = {
    info: (msg, meta) => pinoInstance.info(meta, msg),
    error: (msg, meta) => pinoInstance.error(meta, msg),
    warn: (msg, meta) => pinoInstance.warn(meta, msg),
    debug: (msg, meta) => pinoInstance.debug(meta, msg),
};
