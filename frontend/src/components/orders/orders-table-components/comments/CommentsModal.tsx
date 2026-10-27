import styles from "./CommentsModal.module.scss";
import {type FC, useState} from "react";
import type {IComment} from "../../../../interfaces/IComment.ts";
import {Modal} from "../../../ui/Modal.tsx";
import {CommentsList} from "./CommentsList.tsx";
import {Button} from "../../../ui/Button.tsx";
import {Pagination} from "../../../pagination/Pagination.tsx";

type CommentsModalProps = {
    comments: IComment[];
    onClose: () => void;
};

export const CommentsModal: FC<CommentsModalProps> = ({ comments, onClose }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 5;
    const totalPages = Math.ceil(comments.length / pageSize);

    const commentsToShow = comments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <Modal onClose={onClose} className={styles.commentsModal}>
            <CommentsList comments={commentsToShow}/>
            <div className={styles.commentsModalPagination}>

                {totalPages > 1 && (
                    <Pagination
                        totalPages={totalPages}
                        prevPage={currentPage > 1}
                        nextPage={currentPage < totalPages}
                        statePage={currentPage}
                        onStatePageChange={setCurrentPage}
                    />
                )}

                <Button onClick={onClose}>
                    Close
                </Button>
            </div>
        </Modal>
    );
};
