import type {IGroup, IGroupCreate} from "../interfaces/IGroup.ts";
import {getItems, postItem} from "./api.service.ts";

export const groupService = {
    getGroups: async (): Promise<IGroup[]> => {
      return await getItems<IGroup[]>("/groups");
    },

    createGroup: async (body: IGroupCreate): Promise<IGroup> => {
        return await postItem<IGroup, IGroupCreate>("/groups", body);
    }
};