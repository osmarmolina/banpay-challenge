import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const Token = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
     
        const request = ctx.switchToHttp().getRequest();
        //const token = request.token;

        if(!request.token){
            throw new InternalServerErrorException('Token not found in request Authguard')
        }

        return request.token;
    },
);
    