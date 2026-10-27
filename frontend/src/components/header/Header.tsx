import {Logo} from "../logo/Logo.tsx";
import {AuthInfo} from "./AuthInfo.tsx";
import styles from "./Header.module.scss";

export const Header = () => {
    return (
        <div className={styles.headerContainer}>
            <header className={styles.header}>
                <Logo/>
                <AuthInfo/>
            </header>
        </div>
    );
};
