import {UserEntity} from "../user/entity/user.entity";
import {userRepository} from "../user/repository/user.repository";
import {comparePassword, hashPassword} from "./utils";
import {UserRole} from "../user/types/roles.enum";
import {RegisterDto} from "./dto/register.dto";
import {generateToken} from "./utils/jwt";


interface IAuthService {
    register(createUserDto: RegisterDto): Promise<{
        user: UserEntity,
        accessToken: string;
    }> ;
    login(email: string, password: string): Promise<{
        user: UserEntity,
        accessToken: string;
    }> ;
}

class AuthService implements IAuthService{
    async register(createUserDto: RegisterDto): Promise<{
        user: UserEntity,
        accessToken: string;
    }> {
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

        const token: string = generateToken(newUser);

        return {
            user: newUser,
            accessToken: token,
        };
    }

    async login(email: string, password: string): Promise<any> {
        const user: UserEntity | null = await userRepository.findByEmail(email);
        if (!user) throw new Error("User not found!");

        if (!user.passwordHash)
            throw new Error("User has no password hash — possibly corrupted record");

        const isValid: boolean = await comparePassword(password, user.passwordHash);
        if (!isValid) throw new Error("Invalid credentials");

        const token: string = generateToken(user);

        return {
            user,
            accessToken: token,
        };
    }
}


export const authService = new AuthService();