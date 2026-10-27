import {Navigate, Outlet} from "react-router-dom";
import {useAppSelector} from "../store/hooks/useAppSelector.tsx";
import {roles} from "../constants/roles.ts";

export const AdminRoute = () => {
    const {
        user,
        isAuthenticated,
    } = useAppSelector(({ authSlice }) => authSlice);

    if (!isAuthenticated) {
        return  <Navigate to="/login" replace />;
    }

    if (
        !user || user.role !== roles.ADMIN
    ) {
        return <Navigate to="/orders" replace />;
    }

    return <Outlet />;
};