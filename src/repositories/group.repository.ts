import { IGroup, IGroupCreateDTO } from "../interfaces/group.interface";
import { Group } from "../models/group.model";

class GroupRepository {
    public async getGroups(): Promise<IGroup[]> {
        return await Group.find()
            .collation({
                locale: "uk",
                numericOrdering: true,
            })
            .sort({ name: 1 });
    }

    public async createGroup(group: IGroupCreateDTO): Promise<IGroup> {
        return await Group.create(group);
    }
}

export const groupRepository = new GroupRepository();
