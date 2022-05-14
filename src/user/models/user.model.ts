import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsPositive, IsString, Length } from "class-validator";

export class UserModel {
  @ApiProperty({
    example: '1',
    description: 'Идентификационный номер пользователя',
  })
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123Adwr.', description: 'Пароль' })
  @IsString()
  @Length(6)
  password: string;

  @ApiProperty({
    example: '2022-03-12 02:14:08.956309',
    description: 'Дата создания пользователя',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-03-12 02:14:08.956309',
    description: 'Дата обновления пользователя',
  })
  updatedAt: Date;
}
