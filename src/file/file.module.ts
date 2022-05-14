import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from './file.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [FileService],
  controllers: [FileController],
  imports: [TypeOrmModule.forFeature([FileRepository]), ConfigModule],
})
export class FileModule {}
