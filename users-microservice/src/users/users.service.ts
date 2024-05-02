import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PaginationDto, UpdateUserDto, UpdateUserRootDto } from './dto';
import { FindMultiple } from './interfaces/find-multiple.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {
    private readonly logger = new Logger('Users-Microservice');

    constructor() {
        super();
    }
    onModuleInit() {
        this.$connect()
        this.logger.log('Connected to the database')

    }


    async findByMultipleParams(data: FindMultiple) {
        const values = []

        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const element = data[key];
                values.push({ [key]: element })
            }
        }

        const user = await this.user.findFirst({
            where: {
                OR: values
            }
        })

        return user
    }


    async getUserById(user: any) {

        return this.user.findUnique({
            where: {
                id: user.id,
                deleted: false
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        })
    }

    async getallUsers(data: PaginationDto) {

        const { page, limit, ...rest } = data

        const total = await this.user.count({
            where: rest
        })

        const users = await this.user.findMany({
            where: rest,
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                deleted: true
            },
            skip: (page - 1) * limit,
            take: limit
        })

        return{
            users,
            metadata:{
                totalRegisters: total,
                page: data.page,
                limit: data.limit,
                totalPages: Math.ceil(total / data.limit)
            
            }
        }
    }

    async updateUser(data: UpdateUserDto) {

        console.log(data)

        const { user, ...newData } = data

        const datToBeUpdated = {}

        if ('email' in newData && user.email !== newData.email) {

            const userEmail = await this.findByMultipleParams({ email: newData.email })

            if (userEmail) throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: 'Email already exists'
            })
            datToBeUpdated['email'] = newData.email
        }

        if ('username' in  newData && user.username !== newData.username) {
            const findUsername = await this.findByMultipleParams({ username: newData.username })

            if (findUsername) throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: 'Username already exists'
            })
            datToBeUpdated['username'] = newData.username
        }

        if ('role' in newData &&  user.role !== newData.role) {
            datToBeUpdated['role'] = newData.role
        }

        console.log('daytato update', datToBeUpdated)

        if (Object.keys(datToBeUpdated).length !== 0) {

            return this.user.update({
                where: {
                    id: user.id
                },
                data: datToBeUpdated,
                select: {
                    id: true,
                    username: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true
                }
            })
        }


        return user




    }

    async updateUserRoot(data: UpdateUserRootDto) {

        const user = await this.findByMultipleParams({ id: data.id })

        const datToBeUpdated = {}

        if (user.email !== data.email) {

            const userEmail = await this.findByMultipleParams({ email: data.email })

            if (userEmail) throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: 'Email already exists'
            })
            datToBeUpdated['email'] = data.email
        }

        if (user.username !== data.username) {
            const findUsername = await this.findByMultipleParams({ username: data.username })

            if (findUsername) throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: 'Username already exists'
            })
            datToBeUpdated['username'] = data.username
        }

        if (data.role) datToBeUpdated['role'] = data.role

        if (Object.keys(datToBeUpdated).length !== 0) {

            return this.user.update({
                where: {
                    id: user.id
                },
                data: datToBeUpdated
            })
        }


        return user


    }


    async deleteUser(id: string) {

        const user = await this.findByMultipleParams({ id })

        if (!user) {
            throw new RpcException({
                status: HttpStatus.NOT_FOUND,
                message: 'User not found'
            })
        }

        if (user.deleted) {
            return user
        }

        return this.user.delete({
            where: {
                id
            }
        })
    }


}
