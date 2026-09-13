import { ManagerStatusEnum } from "../enums/manager-status.enum";
import { UserRoleEnum } from "../enums/user-role.enum";

export interface IUser {
    _id: string;
    email: string;
    name: string;
    surname: string;
    password?: string;
    lastLogin: Date | null;
    role: UserRoleEnum;
    status?: ManagerStatusEnum;
}

export interface IUserCreateDTO {
    email: string;
    name: string;
    surname: string;
    role: UserRoleEnum;
    password?: string | null;
    status?: ManagerStatusEnum;
}

export interface IUserResult {
    _id: string;
    email: string;
    name: string;
    surname: string;
    lastLogin: string | null;
    role: UserRoleEnum;
}
