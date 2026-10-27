export interface IGroup {
    _id: string;
    name: string;
}

export type IGroupCreate = Pick<IGroup, "name">;