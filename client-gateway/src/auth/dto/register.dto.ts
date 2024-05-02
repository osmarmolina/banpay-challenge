import { IsString, IsNotEmpty, IsEmail, IsEnum, IsOptional, IsAlphanumeric, MinLength } from "class-validator";
import { Role } from "../../common/enum/role.enum";


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