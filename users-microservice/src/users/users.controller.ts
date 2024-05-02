import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { UpdateUserDto, UserValidatedDto, } from './dto';
import { PaginationDto } from './dto/pagination.dto';
import { isMongoId } from 'class-validator';
import { GhibliService } from './ghibli/ghibli.service';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly ghibliService: GhibliService
  ) { }


  @MessagePattern('get-user')
  getUser(@Payload() user: UserValidatedDto) {
    return this.usersService.getUserById(user);
  }

  @MessagePattern('get-all')
  getAll(@Payload() data: PaginationDto) {
    return this.usersService.getallUsers(data)
  }

  @MessagePattern('update-user')
  upateUser(@Payload() data: UpdateUserDto) {
    return this.usersService.updateUser(data)
  }

  @MessagePattern('update-user-root')
  upateUserRoot(@Payload() data: any) {
    return this.usersService.updateUserRoot(data)
  }


  @MessagePattern('delete-user')
  deleteUser(@Payload() id: string) {
    if (!isMongoId(id)) {
      throw new RpcException({
        status: 400,
        message: 'Invalid id'

      })
    }
    return this.usersService.deleteUser(id)
  }

  @MessagePattern('get-ghibli-preference')
  getPrefrences(@Payload() user: UserValidatedDto) {
    return this.ghibliService.getByPreference(user.role)
  }



}
