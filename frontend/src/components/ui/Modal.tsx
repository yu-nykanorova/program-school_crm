import * as React from "react";
import styles from "./Modal.module.scss";
import {type FC, useEffect} from "react";

type ModalProps = {
    children: React.ReactNode;
    onClose: () => void;
    className?: string;
}

export const Modal: FC<ModalProps> = ({ children, onClose, className }) => {

    useEffect(() => {
        const initOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = initOverflow;
        }
    }, []);

    return (
        <div
            className={styles.modalBackdrop}
            onClick={onClose}
        >
            <div
                className={`${styles.modal} ${className ?? ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};