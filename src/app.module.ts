import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','build'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        BACKEND_PORT: Joi.number().default(5000),
        DB_SYNCHRONIZE: Joi.boolean().default(true),
        DB_URL: Joi.string().default(
          'postgres://erinjuih:KzXiY3kG60GzFDWul6U8bM_dlWBEewEl@abul.db.elephantsql.com/erinjuih',
        ),
        SECRET_KEY: Joi.string().default('SECRETKEY'),
        JWT_EXPIRESIN_TIME: Joi.string().default('2h'),
        YANDEX_CLOUD_REGION: Joi.string().default('eu-central-1'),
        YANDEX_SIGNATURE_VERSION: Joi.string().default('v4'),
        YANDEX_ACCESS_KEY_ID: Joi.string().default('YCAJEd2iIB7xJGOvAkmNllJIg'),
        YANDEX_SECRET_ACCESS_KEY: Joi.string().default(
          'YCNxZNtXFWUZEM6wDF_ZWLPXYqWBGYYVusRS9DNK',
        ),
        YANDEX_BUCKET_NAME: Joi.string().default('file.storage'),
        PERSIGNED_URL_EXPIRES_TIME: Joi.number().default(600),
        AWS_SDK_ENDPOINT_NAME: Joi.string().default(
          'https://storage.yandexcloud.net',
        ),
      }),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DB_URL'),
        entities: ['dist/**/*.entity.js'],
        synchronize: configService.get('DB_SYNCHRONIZE'),
        logging: false,
      }),
    }),

    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
