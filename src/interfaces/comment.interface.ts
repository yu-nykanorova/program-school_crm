import { ICommentManagerResult } from "./manager.interface";

export interface IComment {
    text: string;
    managerId: string;
    createdAt: Date;
}

export type ICommentCreateDTO = Pick<IComment, "text">;

export interface ICommentResult {
    text: string;
    manager: ICommentManagerResult;
    createdAt: string;
}
