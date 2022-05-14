import { ApiProperty } from "@nestjs/swagger";


export class LoginUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  email: string;

  @ApiProperty({ example: '123Adwr.', description: 'Пароль' })
  password: string;
}
