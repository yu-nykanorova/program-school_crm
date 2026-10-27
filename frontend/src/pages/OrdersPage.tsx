import {FiltersPanel} from "../components/filters/FiltersPanel.tsx";
import {OrdersTable} from "../components/orders/OrdersTable.tsx";
import {Pagination} from "../components/pagination/Pagination.tsx";
import styles from "./OrdersPage.module.scss";
import {useSearchParams} from "react-router-dom";
import {useAppSelector} from "../store/hooks/useAppSelector.tsx";
import {useCallback, useEffect} from "react";
import {orderSliceActions} from "../store/slices/orderSlice.ts";
import {Loader} from "../components/ui/Loader.tsx";
import {useAppDispatch} from "../store/hooks/useAppDispatch.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import {groupSliceActions} from "../store/slices/groupSlice.ts";
import type {OrderQuerySortFull} from "../constants/orderQuerySort.ts";
import {getOrdersFiltersFromParams} from "../utils/getOrdersFilter.ts";
import {useDebounce} from "../hooks/useDebounce.ts";

export const OrdersPage = () => {
    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams({
        page: "1",
        order: "-publicId"
    });

    const debouncedParams = useDebounce(searchParams, 400);

    const currentOrder = (searchParams.get("order") as OrderQuerySortFull | null) ?? "-publicId";

    const {
        orders,
        totalPages,
        prevPage,
        nextPage,
        loading,
        error
    } = useAppSelector(({ orderSlice }) => orderSlice);

    const {
        groups,
        loading: groupsLoading,
        error: groupsError
    } = useAppSelector(({ groupSlice }) => groupSlice);

    useEffect(() => {
        const queryPage = Number(debouncedParams.get("page")) || 1;
        const queryPageSize = Number(debouncedParams.get("pageSize")) || 25;

        const queryOrder = (debouncedParams.get("order") as OrderQuerySortFull | null) ?? "-publicId";

        dispatch(
            orderSliceActions.loadOrders({
                ...getOrdersFiltersFromParams(debouncedParams),
                order: queryOrder,
                page: queryPage,
                pageSize: queryPageSize,
            }),
        );
    }, [dispatch, debouncedParams]);

    useEffect(() => {
        dispatch(
            groupSliceActions.loadGroups(),
        );
    }, [dispatch]);

    const handleSortChange = useCallback(
        (order: OrderQuerySortFull) => {
            setSearchParams((prevParams) => {
                const nextParams = new URLSearchParams(prevParams);

                nextParams.set("order", order);
                nextParams.set("page", "1");

                return nextParams;
            });
        }, [setSearchParams],
    );

    const handleResetFilters = () => {
        setSearchParams({
            page: "1",
            order: "-publicId"
        });
    };

    return (
        <div className={styles.ordersPage}>
            <FiltersPanel
                groups={groups}
                groupsLoading={groupsLoading}
                groupsError={groupsError}
                onResetFilters={handleResetFilters}
            />

            {loading && <Loader/>}

            {!loading && error && (
                <ErrorMessage message={error}/>
            )}

            {!loading && !error && orders.length > 0 && (
                <OrdersTable
                    orders={orders}
                    currentSortOrder={currentOrder}
                    onSortChange={handleSortChange}
                />
            )}

            {!loading && !error && orders.length === 0 && (
                <div className="info-message">No orders available</div>
            )}

            <Pagination
                totalPages={totalPages}
                prevPage={prevPage}
                nextPage={nextPage}
            />
        </div>
    );
};
