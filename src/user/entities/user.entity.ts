import {Entity} from "../../shared/baseModel/entity.abstract";

export class User extends Entity{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthday: Date;
    role: UserRole;
}

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}
