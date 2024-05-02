import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto, LoginDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @MessagePattern('register')
  register(@Payload() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @MessagePattern('login')
  login(@Payload() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @MessagePattern('validate')
  validate(@Payload() token: string) {
    return this.authService.validate(token);
  }
}
