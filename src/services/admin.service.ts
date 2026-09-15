import { UserRoleEnum } from "../enums/user-role.enum";
import {
    IManagerCreateDTO,
    IManagerResult,
    IManagerStatisticsDB,
    IManagerWithStatisticsResult,
} from "../interfaces/manager.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response";
import { IUserQuery, IUserResult } from "../interfaces/user.interface";
import { orderRepository } from "../repositories/order.repository";
import { userRepository } from "../repositories/user.repository";
import { IOrdersStatistics } from "../interfaces/order.interface";

const LIMIT_PAGE_SIZE = 10;

class AdminService {
    public async getManagers(
        query: IUserQuery,
    ): Promise<IPaginatedResponse<IManagerWithStatisticsResult>> {
        const dataFromDB = await userRepository.getManagers(query);

        const managers: IUserResult[] = dataFromDB.data;
        const totalItems = dataFromDB.totalItems;

        const pageSize = LIMIT_PAGE_SIZE;
        const page = Number(query.page);
        const totalPages = Math.ceil(totalItems / pageSize);

        const managerIds = managers.map((manager) => manager._id);
        const statistics =
            await orderRepository.getManagersStatistics(managerIds);

        const statisticsMap = new Map<string, IManagerStatisticsDB>();
        statistics.forEach((statistic) => {
            statisticsMap.set(statistic._id, statistic);
        });

        const data: IManagerWithStatisticsResult[] = managers.map((manager) => {
            if (!manager.status) {
                throw new Error(`Manager ${manager._id} has no status`);
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

    public async createManager(
        manager: IManagerCreateDTO,
    ): Promise<IManagerResult> {}

    public async banManager(
        managerId: string
    ): Promise<void> {}

    public async unbanManager(
        managerId: string
    ): Promise<void> {}

    public async activateRequest(
        managerId: string
    ): Promise<void> {}

    public async getOrdersStatistics()Promise<IOrdersStatistics> {

    };
}

export const adminService = new AdminService();
