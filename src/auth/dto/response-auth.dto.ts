import { ApiProperty } from "@nestjs/swagger";
import { UserModel } from "src/user/models/user.model";
import { ResponseUserDto } from "./response-user.dto";

export class AuthResponse {
  private constructor(user: UserModel, access_token: string) {
    const { password, ...result } = user;
    this.user = result;
    this.access_token = access_token;
  }

  static create(dto): AuthResponse {
    return new AuthResponse(dto.user, dto.access_token);
  }

  @ApiProperty()
  user: ResponseUserDto;
  @ApiProperty()
  access_token: string;
}
