import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as AWS from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('File storage by Mikhailov')
    .setDescription('File storage by Mikhailov')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  AWS.config.update({ 
    region: configService.get('YANDEX_CLOUD_REGION'),
    accessKeyId: configService.get('YANDEX_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('YANDEX_SECRET_ACCESS_KEY'),
    signatureVersion: configService.get('YANDEX_SIGNATURE_VERSION'),
  });

  await app.listen(process.env.PORT || 5000, () =>
    console.log(`Server started on port ${process.env.PORT || 5000}`),
  );
}
bootstrap();
