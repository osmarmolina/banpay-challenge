import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { Role } from "src/common/enum/role.enum";

export class UpdateUserDto {


    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsEnum(Role)
    role?: Role;

}