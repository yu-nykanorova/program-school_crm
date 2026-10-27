import type {IManagerStatistics} from "../../interfaces/IManager.ts";
import type {FC} from "react";
import styles from "./ManagerStatistics.module.scss";
import {orderStatuses} from "../../constants/orderStatuses.ts";

type ManagerStatisticsProps = {
    statistics: IManagerStatistics,
    className?: string,
}

export const ManagerStatistics: FC<ManagerStatisticsProps> = ({ statistics, className }) => {
    const statisticsToShow = [
        {status: orderStatuses.TOTAL, amount: statistics.total},
        {status: orderStatuses.IN_WORK, amount: statistics.inWork},
        {status: orderStatuses.AGREE, amount: statistics.agree},
        {status: orderStatuses.DISAGREE, amount: statistics.disagree},
        {status: orderStatuses.DUBBING, amount: statistics.dubbing},
    ];

    const isNullStatistic = (value: number): boolean => {
        return value === 0;
    }

    return (
        <div className={`${styles.managerStatistic} ${className ?? ""}`}>
            {statisticsToShow
                .filter((item) =>
                    item.status === orderStatuses.TOTAL ||
                    !isNullStatistic(item.amount))
                .map((item) => (
                    <div
                        key={item.status}
                        className={styles.managerStatisticsItem}
                    >
                        <p className="no-wrap">{item.status}:</p>
                        <p>{item.amount}</p>
                    </div>
            ))}
        </div>
    );
};
