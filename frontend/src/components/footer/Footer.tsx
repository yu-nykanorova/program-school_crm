import {Logo} from "../logo/Logo.tsx";
import styles from "./Footer.module.scss";

export const Footer = () => {
    return (
        <div className={styles.footerContainer}>
            <footer className={styles.footer}>
                <Logo isText={false}/>
                <p className={styles.footerSlogan}>Code Your Future</p>
            </footer>
        </div>
    );
};
