import * as React from "react";
import type {FC} from "react";
import styles from "./Button.module.scss";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>
{
    children: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({ className = "", type="button", children, ...props }) => {
    return (
        <button
            type={type}
            className={`${styles.button} ${className ?? ""}`}
            {...props}
        >
            {children}
        </button>
    );
};
