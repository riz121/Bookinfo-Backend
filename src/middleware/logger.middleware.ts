import winston from 'winston';

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'debug',
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.cli(),
                winston.format.splat(),
                winston.format.colorize()
            )
        })
    ]
});

export default logger;