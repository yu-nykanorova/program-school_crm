import {LogoIcon} from "../icons/LogoIcon.tsx";
import styles from "./Logo.module.scss";
import {NavLink} from "react-router-dom";

export const Logo = ({ isText = true }: { isText?: boolean }) => {
    return (
        <NavLink to="/" className={styles.logoContainer}>
            <LogoIcon/>
            {
                isText && <span className={styles.logoText}>Programming School</span>
            }
        </NavLink>
    );
};
