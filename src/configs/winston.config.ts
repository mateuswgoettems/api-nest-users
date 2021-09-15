import {
	utilities as nestWinstonModuleUtilities,
	WinstonModuleOptions,
} from 'nest-winston';
import * as winston from 'winston';
import { load } from 'ts-dotenv';
import 'mongodb';
import 'winston-mongodb';
import * as ip from 'ip';

const env = load({
	MONGO_STRING: String
})

export const winstonConfig: WinstonModuleOptions = {
	levels: winston.config.npm.levels,
	level: 'verbose',
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.timestamp(),
				nestWinstonModuleUtilities.format.nestLike(),
			),
		}),
		new winston.transports.File({
			level: 'verbose',
			filename: 'application.log',
			dirname: 'logs',
		}),
		new winston.transports.File({
            level: 'verbose',
            filename: 'application.log',
            dirname: 'logs'
        }),

        new winston.transports.File({
            format: winston.format.printf(info => JSON.stringify(`${info.level}: ${info.message}, ${ip.address()}, date: ${new Date()}`)),
            level: 'error',
            filename: 'error-log.log',
            dirname: 'logs'
        }),

        new winston.transports.MongoDB({
            level: 'verbose',
            db: `${env.MONGO_STRING}`,
            options: { useUnifiedTopology: true },
            collection: 'verboselogs'
        }),

        new winston.transports.MongoDB({

            level: 'error',
            db: `${env.MONGO_STRING}`,
            options: { useUnifiedTopology: true },
            collection: 'errorlog',
            storeHost: true,
            capped: true,
        })
	],
};
