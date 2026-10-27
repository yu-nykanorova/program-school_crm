import styles from "./ErrorMessage.module.scss";
import type {FC} from "react";

type ErrorProps = {
    message?: string;
    className?: string;
}

export const ErrorMessage: FC<ErrorProps> = ({ className, message }) => {
    if (!message) {
        return null;
    }

    return (
        <div className={`${styles.errorMessage} ${className ?? ""}`}>
            {message}
        </div>
    );
};
