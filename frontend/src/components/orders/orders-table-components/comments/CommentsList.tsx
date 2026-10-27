import styles from "./CommentsList.module.scss";
import {CommentsListItem} from "./CommentsListItem.tsx";
import type {FC} from "react";
import type {IComment} from "../../../../interfaces/IComment.ts";

type CommentsListProps = {
    comments: IComment[];
    onClick?: () => void;
}

export const CommentsList: FC<CommentsListProps> = ({ comments, onClick }) => {
    return (
        <div className={styles.commentsList} onClick={onClick}>
            {comments.map((comment, index) => (
                <CommentsListItem
                    key={index}
                    comment={comment}
                />
            ))}
        </div>
    );
};
