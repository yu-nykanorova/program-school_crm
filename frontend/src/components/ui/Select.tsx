import styles from "./Select.module.scss";
import type {FC, SelectHTMLAttributes} from "react";

export interface ISelectOptions {
    optionValue: string;
    optionName: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    defaultOptionName: string;
    optionValues: ISelectOptions[];
}

export const Select: FC<SelectProps> = ({ defaultOptionName, optionValues, className = "", ...rest }) => {
    return (
        <select
            className={`${styles.formSelect}
            ${className}`}
            {...rest}
        >
            <option value="">all {defaultOptionName}</option>
            {
                optionValues.map((value) => (
                    <option key={value.optionValue} value={value.optionValue}>{value.optionName}</option>
                ))
            }
        </select>
    );
};
