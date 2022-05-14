import { PickType } from "@nestjs/swagger";
import { UserModel } from "src/user/models/user.model";

export class ResponseUserDto extends PickType(UserModel, ['id','email','createdAt','updatedAt']) {}