import type {ICommentManager} from "./IManager.ts";

export interface IComment {
    text: string;
    manager: ICommentManager;
    createdAt: string;
}

export type ICommentCreate = Pick<IComment, "text">;
