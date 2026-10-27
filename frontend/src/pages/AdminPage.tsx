import styles from "./AdminPage.module.scss";
import modalStyles from "../components/ui/Modal.module.scss";
import {OrdersStatistic} from "../components/orders/orders-statistic/OrdersStatistic.tsx";
import {Button} from "../components/ui/Button.tsx";
import {ManagersList} from "../components/managers/ManagersList.tsx";
import {Pagination} from "../components/pagination/Pagination.tsx";
import {useAppDispatch} from "../store/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../store/hooks/useAppSelector.tsx";
import {useEffect, useState} from "react";
import {Loader} from "../components/ui/Loader.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import {useSearchParams} from "react-router-dom";
import {adminSliceActions} from "../store/slices/adminSlice.ts";
import {Modal} from "../components/ui/Modal.tsx";
import {CreateManagerForm} from "../components/managers/CreateManagerForm.tsx";
import type {UserQuerySortOrder} from "../interfaces/IUser.ts";
import {ManagersSort} from "../components/managers/ManagersSort.tsx";

export const AdminPage = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        managers,
        totalPages,
        prevPage,
        nextPage,
        statistics,
        managersLoading,
        statisticsLoading,
        managersError,
        statisticsError,
        actionError
    } = useAppSelector(({ adminSlice }) => adminSlice);

    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 25;
    const orderParam = searchParams.get("order");

    const order: UserQuerySortOrder =
        orderParam === "name" ||
        orderParam === "-name" ||
        orderParam === "createdAt" ||
        orderParam === "-createdAt"
            ? orderParam
            : "-createdAt";

    useEffect(() => {
        dispatch(adminSliceActions.clearActionError());
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            adminSliceActions.loadOrdersStatistics(),
        );
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            adminSliceActions.loadManagers({
                page,
                pageSize,
                order,
            }),
        );
    }, [dispatch, page, pageSize, order]);

    const handleManagerCreated = () => {
      setIsModalOpen(false);

      dispatch(
          adminSliceActions.loadManagers({
              page,
              pageSize,
          }),
      );
    };

    const handleOnClose = () => {
        setIsModalOpen(false);
    }

    return (
        <div className={styles.adminPage}>
            {actionError && <ErrorMessage message={actionError}/> }

            {statisticsLoading && <Loader />}

            {!statisticsLoading && statisticsError && (
                <ErrorMessage message={statisticsError}/>
            )}

            {!statisticsLoading && !statisticsError && statistics && (
                <OrdersStatistic statistics={statistics}/>
            )}

            {!statisticsLoading && !statisticsError && !statistics && (
                <div className="info-message">No statistics available</div>
            )}

            <div className={styles.managerActionsBlock}>
                <Button className={styles.createManagerButton} onClick={() => setIsModalOpen(true)}>
                Create
                </Button>

                {isModalOpen && (
                    <Modal
                        onClose={handleOnClose}
                        className={modalStyles.createManagerModal}
                    >
                        <CreateManagerForm onSuccess={handleManagerCreated} onCancel={handleOnClose}/>
                    </Modal>
                )}

                <ManagersSort/>
            </div>

            {managersLoading && <Loader />}

            {!managersLoading && managersError && (
                <ErrorMessage message={managersError} />
            )}

            {!managersLoading && !managersError && managers.length > 0 && (
                <ManagersList managers={managers}/>
            )}

            {!managersLoading && !managersError && managers.length === 0 && (
                <div className="info-message">No managers available</div>
            )}

            <Pagination
                totalPages={totalPages}
                prevPage={prevPage}
                nextPage={nextPage}
            />
        </div>
    );
};
