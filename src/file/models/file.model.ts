import { ApiProperty } from "@nestjs/swagger";

export class FileModel {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  id: number;

  @ApiProperty({
    example: 'Cat.jpg',
    description: 'Название файла',
  })
  name: string;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор пользователя',
  })
  userId: number;

  @ApiProperty({
    example: 'sdsadfdsf54f34f65hy44g545.jpg',
    description: 'Уникальный ключ файла на облаке',
  })
  key: string;

  @ApiProperty({
    example:
      'https://storage.yandexcloud.net/file.storage/9ea85ce9-fa6a-43b5-a930-668684d4e9a9Test13.jpg.jpg',
    description: 'Ссылка для доступа к файлу на облаке',
  })
  link: string;
}
