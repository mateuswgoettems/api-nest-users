import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

export const mailerConfig: MailerOptions = {
	template: {
		dir: path.resolve(__dirname, '..', '..', 'templates'),
		adapter: new HandlebarsAdapter(),
		options: {
			extName: '.hbs',
			layoutsDir: path.resolve(__dirname, '..', '..', 'templates'),
		},
	},
	transport: {
		host: 'mail.lojasbecker.com',
		port: 587,
		ignoreTLS: true,
		secure: false,
		auth: {
			user: 'mailserver',
			pass: 'userpasswd'
		}
	},
};
