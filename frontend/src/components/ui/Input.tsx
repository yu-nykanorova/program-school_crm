import styles from "./Input.module.scss";
import type {FC, InputHTMLAttributes} from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

export const Input: FC<InputProps> = ({ className = "", type = "text", error = false,      ...rest
}) => {
    return (
        <input
            className={`${styles.formInput} ${error ? styles.errorInput : ""} ${className ?? ""}`}
            type={type}
            {...rest}
        />
    );
};
