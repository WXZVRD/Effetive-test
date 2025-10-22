import {UserEntity} from "../user/entity/user.entity";
import {userRepository} from "../user/repository/user.repository";
import {hashPassword} from "./utils";
import {UserRole} from "../user/types/roles.enum";
import {RegisterDto} from "./dto/register.dto";


interface IAuthService {
    register(createUserDto: RegisterDto): Promise<UserEntity>;
    login(email: string, password: string): Promise<any>;
}

class AuthService implements IAuthService{
    async register(createUserDto: RegisterDto): Promise<UserEntity> {
        const existUser: UserEntity | null = await userRepository.findByEmail(createUserDto.email)
        if (existUser) throw new Error('Email already taken');

        const hashedPassword: string = await hashPassword(createUserDto.password);

        const newUser: UserEntity = await userRepository.create({
            email: createUserDto.email,
            role: UserRole.USER,
            birth: createUserDto.birth,
            firstName: createUserDto.firstName,
            middleName: createUserDto.middleName,
            secondName: createUserDto.secondName,
            passwordHash: hashedPassword,
            status: true,
        })

        return newUser
    }

    async login(email: string, password: string): Promise<any> {
        throw new Error("Not implemented yet");
    }
}


export const authService = new AuthService();