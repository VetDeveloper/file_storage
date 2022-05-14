import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { FileRepository } from './file.repository';
import { GetPersistentUrlDTO } from './dto/get-persistent-url.dto';
import { ResponseUrlDTO } from './dto/reponse-url.dto';
import { SaveFileDTO } from './dto/save-file.dto';
import { FileEntity } from './file.entity';
import { DeleteFileDTO } from './dto/delete-file.dto';

@Injectable()
export class FileService {
  constructor(
    private fileRepository: FileRepository,
    private configService: ConfigService,
  ) {}

  async getPersistentUrl(dto: GetPersistentUrlDTO): Promise<ResponseUrlDTO> {
    const fileKey: string = v4() + dto.fileName;

    const s3 = new AWS.S3({
      endpoint: this.configService.get('AWS_SDK_ENDPOINT_NAME'),
    });

    const signedUrl = await s3.getSignedUrlPromise('putObject', {
      Bucket: this.configService.get('YANDEX_BUCKET_NAME'),
      Key: fileKey,
      Expires: this.configService.get('PERSIGNED_URL_EXPIRES_TIME'),
    });

    return {
      signedUrl: signedUrl,
      key: fileKey,
    };
  }

  createOneFile(dto: SaveFileDTO, userId: number) {
    const file: FileEntity = this.fileRepository.create({
      userId: userId,
      key: dto.key,
      link:
        this.configService.get('AWS_SDK_ENDPOINT_NAME') +
        '/' +
        this.configService.get('YANDEX_BUCKET_NAME') +
        '/' +
        dto.key,
    });
    return this.fileRepository.save(file);
  }

  getUserFiles(userId: number): Promise<FileEntity[]> {
    return this.fileRepository.find({ where: { userId: userId } });
  }

  deleteFile(dto : DeleteFileDTO) {
    const s3 = new AWS.S3({
      endpoint: this.configService.get('AWS_SDK_ENDPOINT_NAME'),
    });
    const key: string = dto.key;

    s3.deleteObject({
      Bucket: this.configService.get('YANDEX_BUCKET_NAME'),
      Key: key,
    }).promise();
    
    return this.fileRepository.delete({key});
  }

  /////////////////////////////////////////////////////////////////////////////

  async uploadOneFile(imageBuffer: Buffer, fileName: string, userId: number) {
    try {
      const s3 = new AWS.S3({
        endpoint: this.configService.get('AWS_SDK_ENDPOINT_NAME'),
      });

      const key: string = v4() + fileName;

      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get('YANDEX_BUCKET_NAME'),
          Body: imageBuffer,
          Key: key,
        })
        .promise();

      const file: FileEntity = this.fileRepository.create({
        name: fileName,
        userId: userId,
        key: key,
        link: uploadResult.Location,
      });
      return this.fileRepository.save(file);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
