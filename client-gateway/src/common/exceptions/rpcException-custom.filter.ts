
import { Catch, RpcExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomFilter implements RpcExceptionFilter {

    catch(exception: RpcException, host: ArgumentsHost) {

        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const rpcError = exception.getError()

        //Validamos que exista respuesta de los microservicios
        if (rpcError.toString().includes('Empty response')) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: rpcError.toString()
            })
        }


        if (typeof rpcError === 'object' && 'status' in rpcError && 'message' in rpcError) {
            const status = HttpStatus[+rpcError.status] ? +rpcError.status : 400
            return response.status(status).json({ message: rpcError.message, status: status })
        }

        return response.status(400).json({
            status: 400,
            message: rpcError
        })
    }
}