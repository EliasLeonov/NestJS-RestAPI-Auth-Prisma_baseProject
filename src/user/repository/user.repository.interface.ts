import {BaseRepositoryI} from "../../shared/baseModel/base.repository.interface";
import {User} from "../entities/user.entity";

export abstract class UserRepositoryI extends BaseRepositoryI<User>{
    abstract findByEmail(email: string): Promise<User>;
}