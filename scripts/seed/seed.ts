import { seedAdmin } from "./admin.seed";
import { connectToDB, disconnectFromDB } from "./connectDB";
import { seedGroups } from "./groups.seed";
import { seedManagers } from "./managers.seed";

const seed = async (): Promise<void> => {
    try {
        await connectToDB();

        await seedAdmin();
        await seedManagers();
        await seedGroups();

        console.log("Seeding completed successfully.");
        process.exit(0);
    } catch (e) {
        console.error("Seeding failed!", e);
        process.exit(1);
    } finally {
        await disconnectFromDB();
    }
};

seed();
