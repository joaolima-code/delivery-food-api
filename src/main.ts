import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  require('dotenv').config();

  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('App-delivery')
  .setDescription('Documentação da API')
  .setVersion('0.0.1')
  .addBearerAuth({type: 'http', scheme: 'bearer', bearerFormat: 'Bearer'}, 'access-token')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
