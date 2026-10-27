import styles from "./ManagersList.module.scss";
import type {IManagerWithStatistics} from "../../interfaces/IManager.ts";
import type {FC} from "react";
import {ManagersListCard} from "./ManagersListCard.tsx";

type ManagersProps = {
    managers: IManagerWithStatistics[];
}

export const ManagersList: FC<ManagersProps> = ({ managers }) => {
    return (
        <div className={styles.managersList}>
            {managers.map((manager) => (
                <ManagersListCard
                    key={manager._id}
                    manager = {manager}
                />
            ))}
        </div>
    );
};
