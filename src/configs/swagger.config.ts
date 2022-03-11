import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('API Usuários')
  .setDescription('API Usuários')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
