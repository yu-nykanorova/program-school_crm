import styles from "./ManagersListCard.module.scss";
import type {IManagerWithStatistics} from "../../interfaces/IManager.ts";
import {type FC, useEffect, useRef, useState} from "react";
import {Button} from "../ui/Button.tsx";
import {managerStatuses} from "../../constants/managerStatuses.ts";
import {adminService} from "../../services/adminService.ts";
import {useAppDispatch} from "../../store/hooks/useAppDispatch.tsx";
import {adminSliceActions} from "../../store/slices/adminSlice.ts";
import {formatDate} from "../../utils/formatDate.ts";
import {ManagerStatistics} from "./ManagerStatistics.tsx";

type ManagerProps = {
    manager: IManagerWithStatistics;
}

export const ManagersListCard: FC<ManagerProps> = ({ manager }) => {
    const dispatch = useAppDispatch();

    const [activationLink, setActivationLink] = useState<string | null>(null);
    const [isLinkCopied, setIsLinkCopied] = useState<boolean>(false);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleActivate = async () => {
        try {
            const token = await adminService.activateRequest(manager._id);

            const link = `${window.location.origin}/activate?token=${encodeURIComponent(token)}`;
            setActivationLink(link);
            setIsLinkCopied(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleBan = () => {
        dispatch(
            adminSliceActions.banManager(manager._id),
        );
    };

    const handleUnban = () => {
        dispatch(
            adminSliceActions.unbanManager(manager._id),
        );
    };

    const handleCopyLink = async () => {
        if (!activationLink) return;

        try {
            await navigator.clipboard.writeText(activationLink);

            setActivationLink(null);
            setIsLinkCopied(true);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                setIsLinkCopied(false);
            }, 5000);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.managerListCard}>
            <div className={styles.managerInfo}>
                <div>
                    <p>id: {manager._id}</p>
                    <p>email: {manager.email}</p>
                    <p>name: {manager.name}</p>
                    <p>surname: {manager.surname}</p>
                    <p>is active: {manager.status}</p>
                    <p>last login: {formatDate(manager.lastLogin)}</p>
                </div>

                <ManagerStatistics statistics={manager.statistics}/>
            </div>

            <div className={styles.managerButtonsOuter}>
                <div className={styles.managerButtonsInner }>
                    {activationLink ? (
                    <Button onClick={handleCopyLink}>
                        Copy to clipboard
                    </Button>
                ) : (
                    <Button onClick={handleActivate} className="no-wrap">
                        {manager.status === managerStatuses.ACTIVE
                            ? "Recovery password"
                            : "Activate"}
                    </Button>
                )}
                    <Button onClick={handleBan}>Ban</Button>
                    <Button onClick={handleUnban}>Unban</Button>
                </div>
                {isLinkCopied &&
                    <p className={styles.linkCopied}>Link copied to clipboard!</p>
                }
            </div>
        </div>
    );
};
