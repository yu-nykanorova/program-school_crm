import type {IComment} from "../../../../interfaces/IComment.ts";
import type {FC} from "react";
import styles from "./CommentsListItem.module.scss";
import {formatDate} from "../../../../utils/formatDate.ts";

type CommentItemProps = {
    comment: IComment;
}

export const CommentsListItem: FC<CommentItemProps> = ({ comment }) => {
    return (
        <div className={styles.commentsListItem}>
            <p className={styles.commentText}>{comment.text}</p>
            <div className={styles.commentInfo}>
                <p>{comment.manager.name}</p>
                <p>{formatDate(comment.createdAt)}</p>
            </div>
        </div>
    );
};
