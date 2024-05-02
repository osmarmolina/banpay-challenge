import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class GetAllDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
}
