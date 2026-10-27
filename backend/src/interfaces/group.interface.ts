export interface IGroup {
    _id: string;
    name: string;
}

export type IGroupCreateDTO = Pick<IGroup, "name">;
