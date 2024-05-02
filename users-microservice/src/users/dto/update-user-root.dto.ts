import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { RoleEnum } from "../enum/role.enum";
import { Role } from "@prisma/client";

export class UpdateUserRootDto {

    @IsNotEmpty()
    @IsString()
    id: string;

    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsEnum(RoleEnum)
    role?: Role;
}