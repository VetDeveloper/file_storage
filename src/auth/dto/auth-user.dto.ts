import { PickType } from "@nestjs/swagger";
import { UserModel } from "../../user/models/user.model";

export class AuthUserDto extends PickType(UserModel, ['email', 'password']) {}