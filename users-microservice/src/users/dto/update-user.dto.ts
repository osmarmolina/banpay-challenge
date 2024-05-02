import { Role } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { UserValidatedDto } from "./user-validated.dto";

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

    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}