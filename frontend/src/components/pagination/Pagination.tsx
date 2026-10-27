import styles from "./Pagination.module.scss";
import type {FC} from "react";
import {useSearchParams} from "react-router-dom";
import {getPaginationArray} from "../../utils/getPaginationArray.ts";

type PaginationProps = {
    totalPages: number;
    prevPage: boolean;
    nextPage: boolean;
    statePage?: number;
    onStatePageChange?: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({ totalPages, prevPage, nextPage, statePage, onStatePageChange }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = statePage ?? (Number(searchParams.get("page")) || 1);

    const changePage = (page: number) => {
        if (statePage !== undefined && onStatePageChange !== undefined) {
            onStatePageChange(page);
            return;
        }

        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", String(page));
        setSearchParams(newParams);
    };

    const handleClickPrev = () => {
        if (!prevPage) {
            return;
        }

        changePage(currentPage - 1);
    };

    const handleClickNext = () => {
        if (!nextPage) {
            return;
        }

        changePage(currentPage + 1);
    }

    const handleClickPage = (page: number) => {
        if (page === currentPage) {
            return;
        }

        changePage(page);
    }

    const paginationNumbers = getPaginationArray(currentPage, totalPages);

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className={styles.paginationBlock}>
            <button
                type="button"
                className={`${styles.paginationItem} ${styles.paginationItemButton} ${!prevPage ? styles.hiddenButton : ""}`}
                onClick={handleClickPrev}
                disabled={!prevPage}
            >
                &#8249;
            </button>

            {paginationNumbers.map((pageNumber, index) => {
                if (pageNumber === "dots") {
                    return (
                        <div
                            key={`dots-${index}`}
                            className={`${styles.paginationItem} ${styles.dots}`}
                        >
                            &#8230;
                        </div>
                    );
                }

                return (
                    <button
                        type="button"
                        key={pageNumber}
                        className={`${styles.paginationItem} ${pageNumber === currentPage ? styles.selectedItem : ""}`}
                        onClick={() => handleClickPage(pageNumber)}
                        disabled={pageNumber === currentPage}
                    >
                        {pageNumber}
                    </button>
                )
            })}
            <button
                type="button"
                className={`${styles.paginationItem} ${styles.paginationItemButton} ${!nextPage ? styles.hiddenButton : ""}`}
                onClick={handleClickNext}
                disabled={!nextPage}
            >
                &#8250;
            </button>
        </div>
    );
};
