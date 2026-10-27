import { model, Schema } from "mongoose";

import { IOrdersCounter } from "../interfaces/orders-counter.interface";

const ordersCounterSchema = new Schema({
    _id: { type: String, required: true },
    lastPublicId: { type: Number, required: true, default: 0 },
});

export const OrdersCounter = model<IOrdersCounter>(
    "OrdersCounter",
    ordersCounterSchema,
    "orders-counters",
);
