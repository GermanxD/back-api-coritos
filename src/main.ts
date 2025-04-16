import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { createServer, proxy } from 'aws-serverless-express';
import { Handler } from 'aws-lambda';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  const config = new DocumentBuilder()
    .setTitle('Coritos API')
    .setDescription('System for managing songs and their authors')
    .setVersion('1.0')
    .addTag('Coritos')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.setGlobalPrefix("api");

  app.use(bodyParser.json({ limit: '5mb' }));

  await app.init(); // NOT .listen() — important
}

let cachedServer;

export const handler: Handler = async (event, context) => {
  if (!cachedServer) {
    await bootstrap();
    cachedServer = createServer(expressApp);
  }
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
