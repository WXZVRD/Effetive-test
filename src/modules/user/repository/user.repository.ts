import {AppDataSource} from "../../../configs/database.config";
import {Repository} from "typeorm";
import {UserEntity} from "../entity";

interface IUserRepository {
    findById(id: number): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
    findAll(): Promise<UserEntity[] | null>;
    update(newUser: UserEntity): Promise<UserEntity>;
    create(createUserData: Partial<UserEntity>): Promise<UserEntity>;
}

class UserRepository implements IUserRepository{
    repo: Repository<UserEntity>

    constructor() {
        this.repo = AppDataSource.getRepository(UserEntity)
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return await this.repo.findOne({ where: { email } });
    }

    async findById(id: number): Promise<UserEntity | null> {
        return await this.repo.findOne({ where: { id } });
    }

    async findAll(): Promise<UserEntity[] | null> {
        return await this.repo.find()
    }

    async update(newUser: UserEntity): Promise<UserEntity> {
        return this.repo.save(newUser);
    }

    async create(user: UserEntity): Promise<UserEntity> {
        return await this.repo.save(user);
    }

    async save(user: UserEntity): Promise<UserEntity> {
        return await this.repo.save(user);
    }
}

export const userRepository = new UserRepository();