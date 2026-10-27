import styles from "./NotFoundPage.module.scss";

export const NotFoundPage = () => {
    return (
        <div className={`container ${styles.notFoundPage}`}>
            <p>Page not found</p>
            <div className={styles.statusCode}>404</div>
        </div>
    );
};
