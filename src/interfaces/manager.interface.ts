import { ManagerStatusEnum } from "../enums/manager-status.enum";
import { UserRoleEnum } from "../enums/user-role.enum";
import { IUser } from "./user.interface";

export interface IManager extends Omit<IUser, "role"> {
    role: UserRoleEnum.MANAGER;
    status: ManagerStatusEnum;
}

export interface IManagerWithStatistics extends IManager {
    statistics: IManagerStatistics;
}

export interface IManagerCreateDTO {
    email: string;
    name: string;
    surname: string;
}

export interface IManagerResult {
    _id: string;
    email: string;
    name: string;
    surname: string;
    lastLogin: string | null;
    role: UserRoleEnum.MANAGER;
    status: ManagerStatusEnum;
}

export interface IManagerWithStatisticsResult extends IManagerResult {
    statistics: IManagerStatistics;
}

export interface IManagerStatistics {
    total: number;
    inWork: number;
    agree: number;
    disagree: number;
    dubbing: number;
}
