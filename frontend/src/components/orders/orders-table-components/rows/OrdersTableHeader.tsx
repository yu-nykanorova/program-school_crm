import styles from "./OrdersTableHeader.module.scss";
import mainTableStyles from "../../OrdersTable.module.scss";
import type {FC} from "react";
import type {OrderQuerySort, OrderQuerySortFull} from "../../../../constants/orderQuerySort.ts";

type TableHeaderProps = {
    onSort: (columnKey: OrderQuerySort) => void,
    currentSortOrder?: OrderQuerySortFull,
};

type TableColumnProps = {
    key: OrderQuerySort;
    name: string;
}

export const OrdersTableHeader: FC<TableHeaderProps> = ({ onSort, currentSortOrder }) => {
    const tableColumns: TableColumnProps[] = [
        { key: "publicId", name: "ID" },
        { key: "name", name: "Name" },
        { key: "surname", name: "Surname" },
        { key: "email", name: "Email" },
        { key: "phone", name: "Phone" },
        { key: "age", name: "Age" },
        { key: "course", name: "Course" },
        { key: "courseFormat", name: "Course Format" },
        { key: "courseType", name: "Course Type" },
        { key: "orderStatus", name: "Order Status" },
        { key: "sum", name: "Sum" },
        { key: "alreadyPaid", name: "Already Paid" },
        { key: "group", name: "Group" },
        { key: "createdAt", name: "Created at" },
        { key: "manager", name: "Manager" },
    ];

    const selectedColumn = currentSortOrder?.startsWith("-") ? currentSortOrder.slice(1) : currentSortOrder;

    return (
        <div className={`${mainTableStyles.tableRow} ${styles.tableHeaderRow}`}>
            {tableColumns.map((column) => (
                <div
                    key={column.key}
                    className={`${mainTableStyles.tableCell} ${selectedColumn === column.key ? styles.selectedColumn : ""}`}
                    onClick={() => onSort(column.key)}
                >
                    {column.name}
                </div>
            ))}
        </div>
    );
};