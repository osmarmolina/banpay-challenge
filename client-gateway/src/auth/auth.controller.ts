import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { RegisterDto } from './dto';
import { LoginDto } from './dto/login.dto';
import { catchError } from 'rxjs';
import { AuthGuard } from '../common/guards/auth.guard';
import { User, Token } from '../common/decorators';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.client.send('register', registerDto)
      .pipe(catchError(error => { throw new RpcException(error) }))
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.client.send('login', loginDto)
      .pipe(catchError(error => { throw new RpcException(error) }))
  }

  @UseGuards(AuthGuard)
  @Get('validate')
  validate(
    @User() user: any,
    @Token() token: string
  ) {
    return { user, token }
  }
}
