import { Role } from "@prisma/client";
import { IsString, IsNotEmpty, IsEmail, IsEnum, IsOptional, MinLength, IsAlphanumeric } from "class-validator";


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

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

}

