import { ApiProperty } from '@nestjs/swagger';

export class GetPersistentUrlDTO {
  @ApiProperty({
    example: 'Cat.jpg',
    description: 'Название файла с расширением',
  })
  fileName: string;
}
