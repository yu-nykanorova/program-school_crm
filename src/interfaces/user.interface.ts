import { ManagerStatusEnum } from "../enums/manager-status.enum";
import { UserRoleEnum } from "../enums/user-role.enum";

export interface IUser {
    _id: string;
    email: string;
    name: string;
    surname: string;
    password: string;
    lastLogin: Date | null;
    role: UserRoleEnum;
}

export interface IManager extends IUser {
    status: ManagerStatusEnum;
}

export interface IUserCreateDTO {
    email: string;
    name: string;
    surname: string;
    password?: string;
    role?: UserRoleEnum;
}
