import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { RpcCustomFilter } from './common/exceptions/rpcException-custom.filter';

async function bootstrap() {
  const logger = new Logger('Main Client-Gateway');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new RpcCustomFilter());

  await app.listen(envs.port);

  logger.log(`Client-Gateway Microservice is running on port: ${envs.port}`);
}
bootstrap();
