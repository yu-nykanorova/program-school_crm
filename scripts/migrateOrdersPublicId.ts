import { Order } from "../src/models/order.model";
import { OrdersCounter } from "../src/models/orders-counter.model";
import { connectToDB, disconnectFromDB } from "./seed/connectDB";

const migrateOrdersPublicId = async (): Promise<void> => {
    const lastOrder = await Order.findOne({
        publicId: { $exists: true, $ne: null },
    })
        .sort({ publicId: -1 })
        .select("publicId")
        .lean();

    let nextPublicId = (lastOrder?.publicId ?? 0) + 1;

    const orders = await Order.find({
        $or: [{ publicId: { $exists: false } }, { publicId: null }],
    })
        .sort({ createdAt: 1, _id: 1 })
        .select("_id")
        .lean();

    const updatedOrders = orders.map((order) => ({
        updateOne: {
            filter: {
                _id: order._id,
                $or: [{ publicId: { $exists: false } }, { publicId: null }],
            },
            update: {
                $set: { publicId: nextPublicId++ },
            },
        },
    }));

    if (updatedOrders.length > 0) {
        await Order.bulkWrite(updatedOrders);
    }

    const newLastOrder = await Order.findOne({
        publicId: { $exists: true, $ne: null },
    })
        .sort({ publicId: -1 })
        .select("publicId")
        .lean();

    const maxPublicId = newLastOrder?.publicId ?? 0;

    await OrdersCounter.updateOne(
        { _id: "orders" },
        { $max: { lastPublicId: maxPublicId } },
        { upsert: true },
    );

    console.log(
        `Assigned publicId to ${updatedOrders.length} orders.`,
    );
};

const run = async (): Promise<void> => {
    try {
        await connectToDB();
        await migrateOrdersPublicId();
    } catch (error) {
        console.error("Orders publicId migration failed", error);
        process.exitCode = 1;
    } finally {
        await disconnectFromDB();
    }
};

void run();
