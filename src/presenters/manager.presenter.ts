import {
    IManager,
    IManagerResult,
    IManagerWithStatistics,
    IManagerWithStatisticsResult,
} from "../interfaces/manager.interface";

class ManagerPresenter {
    public toPublicResDto(manager: IManager): IManagerResult {
        return {
            _id: manager._id,
            email: manager.email,
            name: manager.name,
            surname: manager.surname,
            role: manager.role,
            status: manager.status,
            lastLogin: manager.lastLogin ? manager.lastLogin.toString() : null,
        };
    }

    public toPublicResDtoWithStatistics(
        manager: IManagerWithStatistics,
    ): IManagerWithStatisticsResult {
        return {
            ...this.toPublicResDto(manager),
            statistics: manager.statistics,
        };
    }
}

export const managerPresenter = new ManagerPresenter();
