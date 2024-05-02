
import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        if(!request.user){
            throw new InternalServerErrorException('User not found in request Authguard')
        }

        return data ? user?.[data] : user;
    },
);
    