import * as React from "react";
import {type FC, type FormHTMLAttributes} from "react";
import styles from "./Form.module.scss";

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    children: React.ReactNode;
}

export const Form: FC<FormProps> = ({ className = "", children, ...rest }) => {
    return (
        <form className={`${styles.form} ${className}`} {...rest}>
            {children}
        </form>
    );
};
