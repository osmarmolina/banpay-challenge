import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { GhibliService } from './ghibli/ghibli.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, GhibliService],
})
export class UsersModule {}
