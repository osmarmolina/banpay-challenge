import { Role } from "@prisma/client";

export interface FindMultiple {
    username?: string;
    email?: string;
    role?: Role
    id?: string
}