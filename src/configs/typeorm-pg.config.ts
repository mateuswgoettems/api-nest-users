import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { load } from 'ts-dotenv';

const env = load({
  DB_HOST: String,
  DB_PORT: Number,
  DB_USER: String,
  DB_PASSWD: String,
  DATABASE: String,
});
export const typeOrmPgConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWD,
  database: env.DATABASE,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
