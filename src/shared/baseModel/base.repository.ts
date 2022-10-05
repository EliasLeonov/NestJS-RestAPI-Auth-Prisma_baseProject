import {BaseRepositoryI} from "./base.repository.interface";
import {Entity} from "./entity.abstract";
import {DatabaseService} from "../prisma/database.service";
import {Models} from "../prisma/models";
import {PrismaErrorHandler} from "../errors/InvalidModelError";
import {InvalidModelError} from "../errors/errors";

export class BaseRepository<T extends Entity> implements BaseRepositoryI<T>{

    constructor(private readonly db: DatabaseService, private readonly model: string) {
        if (!Models.includes(model)) throw new InvalidModelError(`Model ${model} already exists`);
    }

    async delete(id: T["id"]): Promise<boolean> {
        let object = undefined;
        try {
            object = await this.db[this.model].update({where: {id}, data: {deletedAt: new Date()}});
        } catch (e) {
            PrismaErrorHandler(e);
        }
        return object;
    }

    async findAll(): Promise<T[]> {
        let object = undefined;
        try {
            object = await this.db[this.model].findMany();
        } catch (e) {
            PrismaErrorHandler(e);
        }
        return object;
    }

    async findById(id: T["id"]): Promise<T> {
        let object = undefined;
        try {
            object = await this.db[this.model].findUnique({where: {id: id, deletedAt: undefined}});
        } catch (e) {
            PrismaErrorHandler(e);
        }
        return object;
    }

    async save(data: any): Promise<T> {
        let object = undefined;
        try {
            object = await this.db[this.model].create({data});
        } catch (e) {
            PrismaErrorHandler(e);
        }
        return object;
    }

    async update(id: T["id"], query: any): Promise<T> {
        let object = undefined;
        try {
            object = await this.db[this.model].update({
                where: {id},
                ...query,
            });
        } catch (e) {
            PrismaErrorHandler(e);
        }
        return object;
    }
     async findOne(query: any): Promise<T>{
         let object = undefined;
         try {
             object = await this.db[this.model].findFirst({ ...query });
         } catch (e) {
             PrismaErrorHandler(e);
         }
         return object;
    }


}