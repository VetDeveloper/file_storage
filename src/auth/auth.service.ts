import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import { UserModel } from "src/user/models/user.model";
import { UserService } from "src/user/user.service";
import { AuthUserDto } from "./dto/auth-user.dto";
import { AuthResponse } from "./dto/response-auth.dto";
import { TokenPayload } from "./models/token-payload.model";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private getTokenObject(user: UserModel): AuthResponse {
    const payload: TokenPayload = { id: user.id, email: user.email };

    return AuthResponse.create({
      user: user,
      access_token: this.jwtService.sign(payload),
    });
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Неправильный логин или пароль');
    }

    const passwordEquals = await bcrypt.compare(pass, user.password);

    if (passwordEquals) {
      return user;
    }

    throw new UnauthorizedException('Неправильный логин или пароль');
  }

  async login(dto: AuthUserDto): Promise<AuthResponse> {
    const user: UserModel = await this.validateUser(dto.email, dto.password);
    return this.getTokenObject(user);
  }

  async registration(userDto: AuthUserDto): Promise<AuthResponse> {
    const isUserAlreadyExist = await this.usersService.getUserByEmail(
      userDto.email,
    );

    if (isUserAlreadyExist) {
      throw new BadRequestException(
        'Пользователь с таким email уже существует',
      );
    }

    const user = await this.usersService.registrateOne({
      ...userDto,
    });
    return this.getTokenObject(user);
  }
}
