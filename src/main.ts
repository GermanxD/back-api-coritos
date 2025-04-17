import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Coritos API')
    .setDescription('System for managing songs and their authors')
    .setVersion('1.0')
    .addTag('Coritos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api');
  app.use(bodyParser.json({ limit: '10mb' }));

  await app.listen(process.env.PORT || 3000); // Por si Vercel necesita PORT dinámico
}
bootstrap();
