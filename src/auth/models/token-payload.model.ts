import { ApiProperty } from "@nestjs/swagger";

export type TokenPayload = {
    id: number; 
    email: string;
};
