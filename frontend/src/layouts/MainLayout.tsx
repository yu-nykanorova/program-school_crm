import {Footer} from "../components/footer/Footer.tsx";
import {Header} from "../components/header/Header.tsx";
import {Outlet} from "react-router-dom";
import styles from "./MainLayout.module.scss";

export const MainLayout = () => {
    return (
        <div className={`container`}>
            <Header />

            <main className={styles.main}>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};
