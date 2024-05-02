import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoginDto, RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';
import { FindUser, JwtPayload } from './interfaces';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { envs } from '../config';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Auth-Microservice');

  constructor(private readonly jwtService: JwtService) {
    super();
  }
  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }

  async findeOneUser(data: FindUser) {
    const values = [];

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        values.push({ [key]: element });
      }
    }

    const user = await this.user.findFirst({
      where: {
        OR: values,
      },
    });

    return user;
  }

  async signJwt(payload: JwtPayload): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async register(registerDto: RegisterDto) {
    try {
      const user = await this.findeOneUser({
        email: registerDto.email,
        username: registerDto.username,
      });
      if (user) {
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Username or email is already taken',
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = bcrypt.hashSync(registerDto.password, salt);

      const data = await this.user.create({
        data: {
          username: registerDto.username,
          email: registerDto.email,
          password: hashedPassword,
          role: registerDto.role,
        },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return data;
    } catch (error) {
      throw new RpcException({
        status: error.status ?? 400,
        message: error.message ?? 'An error occurred',
      });
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.findeOneUser({ email: loginDto.email });
      if (!user) {
        throw new RpcException({
          status: HttpStatus.UNAUTHORIZED,
          message: 'Email or password is incorrect',
        });
      }

      const isPasswordMatch = bcrypt.compareSync(
        loginDto.password,
        user.password,
      );
      if (!isPasswordMatch) {
        throw new RpcException({
          status: HttpStatus.UNAUTHORIZED,
          message: 'Email or password is incorrect',
        });
      }

      const response = {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token: await this.signJwt({
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        }),
      };

      return response;
    } catch (error) {
      throw new RpcException({
        status: error.error.status ?? 400,
        message: error.message ?? 'An error occurred',
      });
    }
  }

  async validate(token: string) {
    try {
      const { sub, iat, exp, ...user } = await this.jwtService.verify(token, {
        secret: envs.jwtSecret,
      });

      const validateUser = await this.findeOneUser({
        id: user.id,
      });

      return {
        user: {
          id: validateUser.id,
          username: validateUser.username,
          email: validateUser.email,
          role: validateUser.role,
        },
        token: await this.signJwt(validateUser),
      };
    } catch (error) {
      throw new RpcException({
        status: 401,
        message: error.message,
      });
    }
  }
}
