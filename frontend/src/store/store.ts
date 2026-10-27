import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./slices/authSlice.ts";
import {groupSlice} from "./slices/groupSlice.ts";
import {orderSlice} from "./slices/orderSlice.ts";
import {adminSlice} from "./slices/adminSlice.ts";

export const store = configureStore({
    reducer: {
        authSlice: authSlice.reducer,
        orderSlice: orderSlice.reducer,
        adminSlice: adminSlice.reducer,
        groupSlice: groupSlice.reducer,
    },
});