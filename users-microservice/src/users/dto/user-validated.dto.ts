import { Role } from "@prisma/client";
import { RoleEnum } from "../enum/role.enum";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class UserValidatedDto {
    @IsNotEmpty()
    @IsString()
    id: string

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsEnum(RoleEnum)
    role: Role;
}