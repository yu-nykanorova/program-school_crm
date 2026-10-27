import styles from "./OrderEditFormItem.module.scss";
import type {FC, ReactNode} from "react";

type OrderEditFormItemProps = {
    className?: string;
    label: string;
    children: ReactNode;
}

export const OrderEditFormItem: FC<OrderEditFormItemProps> = ({ className, label, children }) => {
    return (
        <div className={`${styles.formField} ${className ?? ""}`}>
            <label>{label}</label>
            {children}
        </div>
    );
};


