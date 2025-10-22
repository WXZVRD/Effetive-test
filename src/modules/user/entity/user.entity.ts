import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserRole} from "../types/roles.enum";


@Entity('users')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    firstName?: string;

    @Column()
    secondName?: string;

    @Column()
    middleName?: string;

    @Column()
    birth?: Date;

    @Column({ unique: true })
    email?: string;

    @Column()
    passwordHash?: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role?: string;

    @Column({
        type: 'boolean'
    })
    status?: boolean;
}