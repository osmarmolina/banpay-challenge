import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { User } from 'src/common/decorators';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { DataUser } from 'src/common/interfaces/data-user.interface';
import { NATS_SERVICE } from 'src/config';
import { PaginationDto, GetAllDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  //GET USER WITH TOKEN
  @UseGuards(AuthGuard)
  @Get()
  getUser(@User() user: DataUser) {
    return this.client.send('get-user', user).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  //GEE ALL USERS ONLY FOR ADMIN
  @UseGuards(AuthGuard)
  @Post()
  getAll(
    @User() user: DataUser,
    @Query() paginationDto: PaginationDto,
    @Body() filters: GetAllDto,
  ) {
    if (user.role !== 'admin')
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'You are not allowed to perform this action',
      });

    return this.client.send('get-all', { ...paginationDto, ...filters }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  //UPDATE USER BY TOKEN EXCEPT ROLE ADMIN
  @UseGuards(AuthGuard)
  @Patch()
  updateUser(@User() user: DataUser, @Body() body: UpdateUserDto) {
    if (user.role !== 'admin' && body.role === 'admin') {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'You are not allowed to selecta admin role',
      });
    }
    return this.client.send('update-user', { user, ...body }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  //UPDATE USER BY ID ONLY FOR ADMIN
  @UseGuards(AuthGuard)
  @Patch(':id')
  updateUserRoot(
    @User() user: DataUser,
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ) {
    if (user.role !== 'admin')
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'You are not allowed to perform this action',
      });

    return this.client.send('update-user-root', { id: id, ...body }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  //DELETE USER BY ID ONLY FOR ADMIN
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@User() user: DataUser, @Param('id') id: string) {
    if (user.role !== 'admin')
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'You are not allowed to perform this action',
      });

    return this.client.send('delete-user', id).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  //GET USER GHIBLI PREFERENCES BY ROLE
  @UseGuards(AuthGuard)
  @Get('ghibli')
  getPrefrence(@User() user: DataUser) {
    if (user.role === 'admin') {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Admin role not allowed to get preferences',
      });
    }
    return this.client.send('get-ghibli-preference', user).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
