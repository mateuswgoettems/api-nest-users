import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import { load } from 'ts-dotenv';

const env = load({
  MAIL_HOST: String,
  MAIL_PORT: Number,
  MAIL_USER: String,
  MAIL_PASS: String,
});

export const mailerConfig: MailerOptions = {
  template: {
    dir: path.resolve(__dirname, '..', 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      extName: '.hbs',
      layoutsDir: path.resolve(__dirname, '..', 'templates'),
    },
  },
  transport: {
    host: env.MAIL_HOST,
    port: env.MAIL_PORT,
    ignoreTLS: false,
    secure: false,
    auth: {
      user: env.MAIL_USER,
      pass: env.MAIL_PASS,
    },
  },
};
