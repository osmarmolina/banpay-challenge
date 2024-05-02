import { Type } from "class-transformer"
import { IsOptional, IsPositive } from "class-validator"
import { GetAllDto } from "./get-all.dto"

export class PaginationDto extends GetAllDto{

    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    page?: number = 1

    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    limit?: number = 10
}