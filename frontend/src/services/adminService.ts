import type {IUserQuery} from "../interfaces/IUser.ts";
import type {IPaginatedResponse} from "../interfaces/IPaginatedResponse.ts";
import type {IManager, IManagerCreate, IManagerStatusResult, IManagerWithStatistics} from "../interfaces/IManager.ts";
import type {IOrdersStatistics} from "../interfaces/IOrder.ts";
import {getItems, postItem} from "./api.service.ts";


export const adminService = {
    getManagers: async (query?: IUserQuery): Promise<IPaginatedResponse<IManagerWithStatistics>> => {
      return await getItems<IPaginatedResponse<IManagerWithStatistics>>("/admin/managers", query);
    },

    createManager: async (body: IManagerCreate): Promise<IManager> => {
        return await postItem<IManager, IManagerCreate>("/admin/managers", body);
    },

    banManager: async (id: string): Promise<IManagerStatusResult> => {
        return await postItem<IManagerStatusResult, string>(`/admin/managers/${id}/ban`);
    },

    unbanManager: async (id: string): Promise<IManagerStatusResult> => {
        return await postItem<IManagerStatusResult, string>(`/admin/managers/${id}/unban`);
    },

    activateRequest: async (id: string): Promise<string> => {
        return await postItem<string, string>(`/admin/managers/${id}/activate-request`);
    },

    getOrdersStatistics: async (): Promise<IOrdersStatistics> => {
        return await getItems<IOrdersStatistics>("/admin/statistics/orders");
    }
};