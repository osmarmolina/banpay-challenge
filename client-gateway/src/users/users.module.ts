import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { NatsModule } from 'src/common/transports/nats.module';

@Module({
  controllers: [UsersController],
  imports: [NatsModule],
})
export class UsersModule {}
