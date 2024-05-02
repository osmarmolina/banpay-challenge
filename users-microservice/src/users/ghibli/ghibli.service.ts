import * as axios from 'axios'
import { HttpStatus, Injectable } from '@nestjs/common'
import { envs } from 'src/config'
import { RpcException } from '@nestjs/microservices'

@Injectable()
export class GhibliService {

    private readonly ghibliUrl = envs.ghibliApi

    async getByPreference(preference: string) {
        try {

            const url =  `${this.ghibliUrl}/${preference}`
            console.log(url)
            const axiosConfig: axios.AxiosRequestConfig = {
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.default.request(axiosConfig)
            return data
        } catch (error) {
            console.log(error)
            throw new RpcException({ status: HttpStatus.BAD_REQUEST, message: 'Error ghibli request data' })
        }

    }
}