import { ManagerStatusEnum } from "../enums/manager-status.enum";
import { UserRoleEnum } from "../enums/user-role.enum";

export interface IUser {
    _id: string;
    email: string;
    name: string;
    surname: string;
    lastLogin: Date | null;
    role: UserRoleEnum;
}

export interface IManager extends IUser {
    status: ManagerStatusEnum;
}

export type IManagerCreateDTO = Pick<IUser, "email" | "name" | "surname">;
