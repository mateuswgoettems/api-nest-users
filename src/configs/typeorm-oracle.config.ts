import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { load } from 'ts-dotenv';

const env = load({
  ORACLE_HOST: String,
  ORACLE_PORT: Number,
  ORACLE_USER: String,
  ORACLE_PASSWD: String,
  ORACLE_DATABASE: String,
  ORACLE_STRING: String,
});
export const typeOrmOracleConfig: TypeOrmModuleOptions = {
  type: 'oracle',
  host: env.ORACLE_HOST,
  port: env.ORACLE_PORT,
  username: env.ORACLE_USER,
  password: env.ORACLE_PASSWD,
  database: env.ORACLE_DATABASE,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  connectString: env.ORACLE_STRING,
};
