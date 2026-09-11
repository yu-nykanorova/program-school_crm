export interface IComment {
    text: string;
    managerId: string;
    createdAt: Date;
}

export type ICommentCreateDTO = Pick<IComment, "text">;
