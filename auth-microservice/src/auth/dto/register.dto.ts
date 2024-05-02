import { IsString, IsNotEmpty, IsEmail, IsEnum, IsOptional, MinLength, IsAlphanumeric } from "class-validator";
import { RoleEnum } from "../enum/role.enum";
import { Role } from "@prisma/client";


export class RegisterDto {
  @IsAlphanumeric()
  @MinLength(4)
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(RoleEnum)
  @IsNotEmpty()
  role: Role;

}

