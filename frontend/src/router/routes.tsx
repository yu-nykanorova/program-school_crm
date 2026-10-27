import {AdminPage} from "../pages/AdminPage.tsx";
import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout.tsx";
import {LoginPage} from "../pages/LoginPage.tsx";
import {ActivatePage} from "../pages/ActivatePage.tsx";
import {ProtectedRoute} from "./ProtectedRoute.tsx";
import {OrdersPage} from "../pages/OrdersPage.tsx";
import {AdminRoute} from "./AdminRoute.tsx";
import {NotFoundPage} from "../pages/NotFoundPage.tsx";

export const routes = createBrowserRouter([
    // Public
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/activate",
        element: <ActivatePage />
    },

    // Protected
    {
        element: <ProtectedRoute/>,
        children: [
            {
                element: <MainLayout/>,
                children: [
                    {
                        path: "/",
                        element: <Navigate to="/orders" replace/>,
                    },
                    {
                        path: "/orders",
                        element: <OrdersPage/>,
                    },
                    {
                        element: <AdminRoute/>,
                        children: [
                            {
                                path: "/admin",
                                element: <AdminPage/>,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage/>
    },
]);