import {BaseRepository} from "../../shared/baseModel/base.repository";
import {UserRepositoryI} from "./user.repository.interface";
import {Injectable} from "@nestjs/common";
import {DatabaseService} from "../../shared/prisma/database.service";
import {User} from "../entities/user.entity";

@Injectable()
export class UserRepository extends BaseRepository<User> implements UserRepositoryI{
    constructor(db: DatabaseService) {
        super(db, 'user');
    }
    findByEmail(email: string): Promise<User> {
        return  this.findOne({where: {email}});
    }
}