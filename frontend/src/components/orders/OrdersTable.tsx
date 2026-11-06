import styles from "./OrdersTable.module.scss";

import {OrdersTableHeader} from "./orders-table-components/rows/OrdersTableHeader.tsx";
import {OrdersTableRow} from "./orders-table-components/rows/OrdersTableRow.tsx";
import type {IOrder} from "../../interfaces/IOrder.ts";
import { type FC, useState } from "react";
import type {OrderQuerySort, OrderQuerySortFull} from "../../constants/orderQuerySort.ts";

type OrdersTableProps = {
    orders: IOrder[];
    currentSortOrder?: OrderQuerySortFull;
    onSortChange: (order: OrderQuerySortFull) => void;
}

export const OrdersTable: FC<OrdersTableProps> = ({ orders, currentSortOrder, onSortChange }) => {
    const [openedRow, setOpenedRow] = useState<string | null>(null);

    const handleSort = (columnKey: OrderQuerySort) => {
        let nextOrder: OrderQuerySortFull;

        if(currentSortOrder === columnKey) {
            nextOrder = `-${columnKey}`;
        } else {
            nextOrder = columnKey;
        }

        onSortChange(nextOrder);
    };

    const handleOpenRow = (rowId: string | null) => {
        setOpenedRow(rowId);
    }

    return (
        <div className={styles.ordersTable}>
            <div className={styles.ordersTableContent}>
                <OrdersTableHeader onSort={handleSort} currentSortOrder={currentSortOrder}/>
                {orders.map((order, index) => (
                    <OrdersTableRow
                        key={order.databaseId}
                        order={order}
                        isOddRow={index % 2 === 0}
                        openedRow={openedRow}
                        openRow={handleOpenRow}
                    />
                ))}
            </div>
        </div>
    );
};
