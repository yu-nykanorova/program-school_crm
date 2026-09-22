import { ManagerStatusEnum } from "../enums/manager-status.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserRoleEnum } from "../enums/user-role.enum";
import { ApiError } from "../errors/api.errors";
import {
    IManager,
    IManagerCreateDTO,
    IManagerStatisticsDB,
    IManagerWithStatistics,
} from "../interfaces/manager.interface";
import { IOrdersStatistics } from "../interfaces/order.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response";
import { IUser, IUserQuery } from "../interfaces/user.interface";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { orderRepository } from "../repositories/order.repository";
import { userRepository } from "../repositories/user.repository";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AdminService {
    public async getManagers(
        query: IUserQuery,
    ): Promise<IPaginatedResponse<IManagerWithStatistics>> {
        const dataFromDB = await userRepository.getManagers(query);

        const managers = dataFromDB.data;
        const totalItems = dataFromDB.totalItems;

        const pageSize = Number(query.pageSize);
        const page = Number(query.page);
        const totalPages = Math.ceil(totalItems / pageSize);

        const managerIds = managers.map((manager) => manager._id);
        const statistics =
            await orderRepository.getManagersStatistics(managerIds);

        const statisticsMap = new Map<string, IManagerStatisticsDB>();
        statistics.forEach((statistic) => {
            statisticsMap.set(statistic._id, statistic);
        });

        const data: IManagerWithStatistics[] = managers.map((manager) => {
            if (!manager.status) {
                throw new ApiError(
                    `Manager ${manager._id} status is missing`,
                    StatusCodesEnum.INTERNAL_SERVER_ERROR,
                );
            }
            const managerStatistics = statisticsMap.get(manager._id);
            return {
                _id: manager._id,
                email: manager.email,
                name: manager.name,
                surname: manager.surname,
                lastLogin: manager.lastLogin,
                role: UserRoleEnum.MANAGER,
                status: manager.status,
                createdAt: manager.createdAt,
                updatedAt: manager.updatedAt,
                statistics: managerStatistics
                    ? {
                          total: managerStatistics.total,
                          inWork: managerStatistics.inWork,
                          agree: managerStatistics.agree,
                          disagree: managerStatistics.disagree,
                          dubbing: managerStatistics.dubbing,
                      }
                    : {
                          total: 0,
                          inWork: 0,
                          agree: 0,
                          disagree: 0,
                          dubbing: 0,
                      },
            };
        });

        return {
            totalItems,
            totalPages,
            prevPage: page > 1,
            nextPage: page < totalPages,
            data,
        };
    }

    public async createManager(manager: IManagerCreateDTO): Promise<IManager> {
        await userService.isEmailUnique(manager.email);

        const newManager = await userRepository.create({
            ...manager,
            role: UserRoleEnum.MANAGER,
            status: ManagerStatusEnum.NEW,
        });

        // if (newManager.role !== UserRoleEnum.MANAGER) {
        //     throw new ApiError(
        //         `User is not a manager`,
        //         StatusCodesEnum.FORBIDDEN,
        //     );
        // }

        // if (!newManager.status) {
        //     throw new ApiError(
        //         `Manager ${newManager._id} status is missing`,
        //         StatusCodesEnum.INTERNAL_SERVER_ERROR,
        //     );
        // }

        return {
            ...newManager,
            role: UserRoleEnum.MANAGER,
            status: newManager.status,
        };
    }

    public async banManager(managerId: string): Promise<void> {
        const manager = await this.getManager(managerId);

        if (manager.status === ManagerStatusEnum.BANNED) {
            throw new ApiError(
                "Manager already banned",
                StatusCodesEnum.BAD_REQUEST,
            );
        }

        await userRepository.updateUser(managerId, {
            status: ManagerStatusEnum.BANNED,
        });
    }

    public async unbanManager(managerId: string): Promise<void> {
        const manager = await this.getManager(managerId);

        if (manager.status === ManagerStatusEnum.ACTIVE) {
            throw new ApiError(
                "Manager already activated",
                StatusCodesEnum.BAD_REQUEST,
            );
        }

        await userRepository.updateUser(managerId, {
            status: ManagerStatusEnum.ACTIVE,
        });
    }

    public async activateRequest(managerId: string): Promise<string> {
        const manager = await this.getManager(managerId);

        const actionToken = tokenService.generateActionToken({
            userId: managerId,
            role: UserRoleEnum.MANAGER,
        });

        await actionTokenRepository.create({
            actionToken,
            _userId: manager._id,
        });

        return actionToken;
    }

    public async getOrdersStatistics(): Promise<IOrdersStatistics> {
        return await orderRepository.getOrdersStatistics();
    }

    private async getManager(managerId: string): Promise<IUser> {
        const manager = await userService.getUserOrThrow(managerId);

        if (manager.role !== UserRoleEnum.MANAGER) {
            throw new ApiError(
                `User is not a manager`,
                StatusCodesEnum.BAD_REQUEST,
            );
        }

        if (!manager.status) {
            throw new ApiError(
                "Manager status is missing",
                StatusCodesEnum.INTERNAL_SERVER_ERROR,
            );
        }

        return manager;
    }
}

export const adminService = new AdminService();
