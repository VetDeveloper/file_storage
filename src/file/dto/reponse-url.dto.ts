import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResponseUrlDTO {
  @ApiProperty({
    example:
      'https://storage.yandexcloud.net/file.storage/79400090-ef7f-4db7-ad2f-b02b8a930bf9Test15.jpg?X-Amz-Algorithm=AWS4-HMAC',
    description: 'URL для загрузки файла',
  })
  signedUrl: string;

  @ApiProperty({
    example: '79400090-ef7f-4db7-ad2f-b02b8a930bf9Test15.jpg',
    description: 'Уникальный ключ объекта в облаке',
  })
  key: string;
}
