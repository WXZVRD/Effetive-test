import {UserEntity} from "./entity";
import {userRepository} from "./repository";

interface IUserService {
    getOne(id: number): Promise<UserEntity>;
    getAll(): Promise<UserEntity[] | null>;
    block(id: number): Promise<UserEntity>;
}

class UserService implements IUserService {
    async getOne(id: number): Promise<UserEntity> {
        const user: UserEntity | null = await userRepository.findById(id);
        if (!user) throw new Error("User not found");

        console.log('UserId: ' + user.id + " Got Fetched");
        return user;
    }

    async getAll(): Promise<UserEntity[] | null> {
        return await userRepository.findAll();
    }

    async block(id: number): Promise<UserEntity> {
        const targetUser: UserEntity | null = await userRepository.findById(id);
        if (!targetUser) throw new Error("User not found");

        targetUser.status = !targetUser.status;
        return await userRepository.save(targetUser);
    }
}

export const userService = new UserService();
