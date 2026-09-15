import { ManagerStatusEnum } from "../enums/manager-status.enum";
import { UserQuerySortEnum } from "../enums/user-query-sort.enum";
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
    createdAt: Date | null;
    updatedAt: Date;
}

export interface IUserCreateDTO {
    email: string;
    name: string;
    surname: string;
    role: UserRoleEnum;
    password?: string | null;
    status?: ManagerStatusEnum;
}

export interface IUserQuery {
    order?: UserQuerySortEnum;
    page?: number;
    pageSize?: number;
}

export interface IUserResult {
    _id: string;
    email: string;
    name: string;
    surname: string;
    lastLogin: string | null;
    role: UserRoleEnum;
    status?: ManagerStatusEnum;
    createdAt: string;
    updatedAt: string;
}
