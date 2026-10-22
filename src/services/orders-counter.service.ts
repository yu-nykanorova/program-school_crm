import { OrdersCounter } from "../models/orders-counter.model";

export const getNextOrderPublicId = async (): Promise<number> => {
    const counter = await OrdersCounter.findByIdAndUpdate(
        "orders",
        { $inc: { lastPublicId: 1 } },
        {
            returnDocument: "after",
            upsert: true,
            setDefaultsOnInsert: true,
        },
    );

    if (!counter) {
        throw new Error("Failed to generate order publicId");
    }

    return counter.lastPublicId;
};
