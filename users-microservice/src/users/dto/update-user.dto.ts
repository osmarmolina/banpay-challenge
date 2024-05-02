import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { UserValidatedDto } from "./user-validated.dto";
import { RoleEnum } from "../enum/role.enum";
import { Role } from "@prisma/client";

export class UpdateUserDto {

    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(()=> UserValidatedDto)
    user: UserValidatedDto

    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    deleted?: boolean;

    @IsEnum(RoleEnum)
    @IsOptional()
    role: Role;
}