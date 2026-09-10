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
    password?: string;
    status?: ManagerStatusEnum;
}

export interface IManager extends IUser {
    role: UserRoleEnum.MANAGER;
    status: ManagerStatusEnum;
}

export interface IManagerCreateDTO {
    email: string;
    name: string;
    surname: string;
}
