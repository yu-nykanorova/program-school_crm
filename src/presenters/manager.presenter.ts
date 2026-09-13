import {
    IManagerResult,
    IManagerWithStatistics,
} from "../interfaces/manager.interface";

class ManagerPresenter {
    public toPublicResDto(manager: IManagerWithStatistics): IManagerResult {
        return {
            _id: manager._id,
            email: manager.email,
            name: manager.name,
            surname: manager.surname,
            role: manager.role,
            status: manager.status,
            lastLogin: manager.lastLogin ? manager.lastLogin.toString() : null,
            statistics: manager.statistics,
        };
    }
}

export const managerPresenter = new ManagerPresenter();
