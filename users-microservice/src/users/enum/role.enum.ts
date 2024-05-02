import { Role } from "@prisma/client";

export const RoleEnum = [
    Role.admin = 'admin',
    Role.films = 'films',
    Role.locations = 'locations',
    Role.species = 'species',
    Role.vehicles = 'vehicles',
    Role.people = 'people',
]
