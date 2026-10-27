import {CommentsList} from "../comments/CommentsList.tsx";
import {type FC, memo, useState} from "react";
import type {IOrder} from "../../../../interfaces/IOrder.ts";
import {CommentForm} from "../comments/CommentForm.tsx";
import mainTableStyles from "../../OrdersTable.module.scss";
import {Button} from "../../../ui/Button.tsx";
import {CommentsModal} from "../comments/CommentsModal.tsx";
import {OrderEditForm} from "../../orders-edit/OrderEditForm.tsx";
import styles from "./OrdersTableRow.module.scss";
import {formatDate} from "../../../../utils/formatDate.ts";
import {Modal} from "../../../ui/Modal.tsx";
import {useAppSelector} from "../../../../store/hooks/useAppSelector.tsx";

type TableRowProps = {
    order: IOrder;
    isOddRow: boolean;
}

export const OrdersTableRow: FC<TableRowProps> = memo(({ order, isOddRow }) => {
    const [isRowOpen, setIsRowOpen] = useState(false);
    const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const { user } = useAppSelector(({ authSlice }) => authSlice);

    const transformedId = order.publicId.toString().padStart(4, "0");

    const allowedToEdit = !order.manager || order.manager?._id === user?._id;

    const hasComments = order.comments.length !== 0;

    const sortedComments = [...order.comments].sort(
        (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime(),
    );

    const valueToDisplay = (value: unknown): string => {
        if (value === null || value === undefined) {
            return "null";
        }

        if (typeof value === "object") {
            if ("name" in value) {
                return String(value.name);
            }

            return "";
        }

        return String(value);
    };

    return (
        <>
            <div
                className={`${mainTableStyles.tableRow} ${styles.dataRow} ${isOddRow ? styles.oddRow : ""} ${isRowOpen ? styles.openRow : ""}`}
                onClick={() => setIsRowOpen((prev) => !prev)}
            >
                <div className={mainTableStyles.tableCell} title={valueToDisplay(transformedId)}>{valueToDisplay(transformedId)}</div>
                <div className={mainTableStyles.tableCell} title={valueToDisplay(order.name)}>{valueToDisplay(order.name)}</div>
                <div className={mainTableStyles.tableCell} title={valueToDisplay(order.surname)}>{valueToDisplay(order.surname)}</div>
                <div className={mainTableStyles.tableCell} title={valueToDisplay(order.email)}>{valueToDisplay(order.email)}</div>
                <div className={mainTableStyles.tableCell} title={valueToDisplay(order.phone)}>{valueToDisplay(order.phone)}</div>
                <div className={mainTableStyles.tableCell} title={valueToDisplay(order.age)}>{valueToDisplay(order.age)}</div>
                <div className={mainTableStyles.tableCell} title={valueToDisplay(order.course)}>{valueToDisplay(order.course)}</div>
                <div className={mainTableStyles.tableCell} title={valueToDisplay(order.courseFormat)}>{valueToDisplay(order.courseFormat)}</div>
                <div className={mainTableStyles.tableCell} title={valueToDisplay(order.courseType)}>{valueToDisplay(order.courseType)}</div>
                <div className={mainTableStyles.tableCell} title={valueToDisplay(order.orderStatus)}>{valueToDisplay(order.orderStatus)}</div>
                <div className={mainTableStyles.tableCell} title={valueToDisplay(order.sum)}>{valueToDisplay(order.sum)}</div>
                <div className={mainTableStyles.tableCell} title={valueToDisplay(order.alreadyPaid)}>{valueToDisplay(order.alreadyPaid)}</div>
                <div className={mainTableStyles.tableCell} title={valueToDisplay(order.group)}>{valueToDisplay(order.group)}</div>
                <div className={mainTableStyles.tableCell} title={valueToDisplay(order.createdAt)}>{valueToDisplay(formatDate(order.createdAt))}</div>
                <div className={mainTableStyles.tableCell} title={valueToDisplay(order.manager)}>{valueToDisplay(order.manager)}</div>
            </div>
            {isRowOpen && (
                <div
                    className={`${styles.hiddenOrderInfo} ${isOddRow ? styles.oddRow : ""}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.messageBlock}>
                        <div>Message: {order.msg}</div>
                        <div>UTM: {order.utm}</div>
                    </div>
                    <div className={styles.editOrderBlock}>
                        <div className={styles.comments}>
                            {hasComments && <CommentsList
                                comments={sortedComments.slice(0, 3)}
                                onClick={() => setIsCommentsModalOpen(true)}
                            />}

                            <CommentForm
                                orderId={order.databaseId}
                                allowedToEdit={allowedToEdit}
                            />

                            {isCommentsModalOpen &&
                                <CommentsModal comments={sortedComments} onClose={() => setIsCommentsModalOpen(false)}/>
                            }
                        </div>

                        <Button
                            onClick={() => setIsEditModalOpen(true)}
                            disabled={!allowedToEdit}
                        >
                            Edit
                        </Button>

                        {isEditModalOpen && (
                            <Modal onClose={() => setIsEditModalOpen(false)}>
                                <OrderEditForm order={order} onClose={() => setIsEditModalOpen(false)}/>
                            </Modal>
                        )}
                    </div>
                </div>
            )}
        </>
    );
});
