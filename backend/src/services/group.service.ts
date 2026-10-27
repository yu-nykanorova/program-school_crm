import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { IGroup, IGroupCreateDTO } from "../interfaces/group.interface";
import { groupRepository } from "../repositories/group.repository";

class GroupService {
    public async getGroups(): Promise<IGroup[]> {
        return await groupRepository.getGroups();
    }

    public async createGroup(dto: IGroupCreateDTO): Promise<IGroup> {
        const group = await groupRepository.getByName(dto.name);

        if (group) {
            throw new ApiError(
                "Group already exists",
                StatusCodesEnum.CONFLICT,
            );
        }

        return await groupRepository.createGroup(dto.name);
    }
}

export const groupService = new GroupService();
