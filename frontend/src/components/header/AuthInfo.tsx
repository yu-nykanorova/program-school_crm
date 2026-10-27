import {Button} from "../ui/Button.tsx";
import {AdminIcon} from "../icons/AdminIcon.tsx";
import {LogoutIcon} from "../icons/LogoutIcon.tsx";
import {NavLink, useNavigate} from "react-router-dom";
import styles from "./AuthInfo.module.scss";
import buttonStyles from "../ui/Button.module.scss";
import {useAppDispatch} from "../../store/hooks/useAppDispatch.tsx";
import {authSliceActions} from "../../store/slices/authSlice.ts";
import {useAppSelector} from "../../store/hooks/useAppSelector.tsx";
import {roles} from "../../constants/roles.ts";

export const AuthInfo = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { user } = useAppSelector(({authSlice}) => authSlice);

    const isAdmin = user?.role === roles.ADMIN;

    const handleLogout = async () => {
        dispatch(authSliceActions.logout());
        navigate("/login", {replace: true});
    }

    return (
        <div className={styles.headerAuthInfo}>
            <p className={styles.headerUsername}>{user?.name}</p>
            {isAdmin && (
                <NavLink to="/admin" className={`${styles.headerButton} ${buttonStyles.button}`}>
                    <AdminIcon/>
                </NavLink>
            )}
            <Button className={styles.headerButton} onClick={handleLogout}>
                <LogoutIcon/>
            </Button>
        </div>
    );
};
