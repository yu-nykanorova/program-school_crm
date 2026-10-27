import type {Role} from "../constants/roles.ts";
import type {ManagerStatus} from "../constants/managerStatuses.ts";
import {type UserQuerySort} from "../constants/userQuerySort.ts";

export interface IUser {
    _id: string;
    email: string;
    name: string;
    surname: string;
    lastLogin: string;
    role: Role;
    status?: ManagerStatus;
    createdAt: string;
    updatedAt: string;
}

export interface IUserQuery {
    order?: UserQuerySortOrder;
    page?: number;
    pageSize?: number;
}

export type UserQuerySortOrder = UserQuerySort | `-${UserQuerySort}`;
