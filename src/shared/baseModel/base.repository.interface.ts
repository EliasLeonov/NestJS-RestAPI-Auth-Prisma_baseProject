import {Entity} from "./entity.abstract";

export abstract class BaseRepositoryI<T extends Entity>{
    abstract save(data: any): Promise<T>;
    abstract delete(id: T['id']): Promise<boolean>;
    abstract findById(id: T['id']): Promise<T>;
    abstract findAll(): Promise<T[]>;
    abstract update(id: T["id"], query: any): Promise<T>;
    abstract findOne(query: any): Promise<T>;
}