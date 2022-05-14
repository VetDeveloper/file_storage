import { Injectable } from '@nestjs/common';
import { AuthUserDto } from 'src/auth/dto/auth-user.dto';
import { UserModel } from './models/user.model';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  getUserByEmail(email: string): Promise<UserModel> {
    return this.userRepository.getUserByEmail(email);
  }

  async registrateOne(dto: AuthUserDto): Promise<UserModel> {
    const hashPassword: string = await bcrypt.hash(dto.password, 5);
    return this.userRepository.save({ ...dto, password: hashPassword });
  }

  findOne(id: number) {
    return this.userRepository.findUserOrFail(id);
  }
}
