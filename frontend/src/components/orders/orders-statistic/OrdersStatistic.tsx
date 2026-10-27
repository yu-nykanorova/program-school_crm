import styles from "./OrdersStatistic.module.scss";
import {orderStatuses} from "../../../constants/orderStatuses.ts";
import type {IOrdersStatistics} from "../../../interfaces/IOrder.ts";
import type {FC} from "react";

type OrdersStatisticProps = {
    statistics: IOrdersStatistics,
}

export const OrdersStatistic: FC<OrdersStatisticProps> = ({ statistics }) => {
    const statisticsToShow = [
        {status: orderStatuses.TOTAL, amount: statistics.total},
        {status: orderStatuses.IN_WORK, amount: statistics.inWork},
        {status: orderStatuses.AGREE, amount: statistics.agree},
        {status: orderStatuses.DISAGREE, amount: statistics.disagree},
        {status: orderStatuses.NEW, amount: statistics.new},
        {status: orderStatuses.NULL, amount: statistics.noStatus},
        {status: orderStatuses.DUBBING, amount: statistics.dubbing},
    ];

    return (
        <div className={styles.ordersStatistic}>
            <div className={styles.statisticTitle}>Orders statistic</div>
            <div className={styles.statisticBox}>
                {statisticsToShow.map((item) => (
                    <div
                        key={item.status}
                        className={styles.statisticItem}
                    >
                        <p className="no-wrap">{item.status}:</p> <p>{item.amount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
