import { seedAdmin } from "./admin.seed";
import { connectToDB, disconnectFromDB } from "./connectDB";

const seed = async (): Promise<void> => {
    try {
        await connectToDB();

        await seedAdmin();
        //await seedOrders();

        console.log("Seeding completed successfully.");
    } catch (e) {
        console.error("Seeding failed!", e);
        process.exit(1);
    } finally {
        await disconnectFromDB();
    }
};

seed();
