import type {ManagerStatus} from "../constants/managerStatuses.ts";
import type {IUser} from "./IUser.ts";

export interface IManager extends IUser {
    status: ManagerStatus;
}

export interface IManagerWithStatistics extends IManager {
    statistics: IManagerStatistics;
}

export interface IManagerStatusResult {
    _id: string;
    status: ManagerStatus;
}

export interface IManagerCreate {
    email: string;
    name: string;
    surname: string;
}

export interface IManagerStatistics {
    total: number;
    inWork: number;
    agree: number;
    disagree: number;
    dubbing: number;
}

export type IOrderManager = Pick<
    IManager,
    "_id" | "name" | "surname" | "email"
>;

export type ICommentManager = Pick<
    IManager,
    "_id" | "name" | "surname"
>;