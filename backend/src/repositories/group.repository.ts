import { IGroup } from "../interfaces/group.interface";
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

    public async createGroup(groupName: string): Promise<IGroup> {
        return await Group.create({ name: groupName });
    }

    public async getByName(groupName: string): Promise<IGroup | null> {
        return await Group.findOne({ name: new RegExp(`^${groupName}$`, "i") });
    }
}

export const groupRepository = new GroupRepository();
