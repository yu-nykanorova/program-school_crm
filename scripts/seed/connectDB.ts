import mongoose from "mongoose";

import { config } from "../../src/configs/config";

export const connectToDB = async (): Promise<void> => {
    console.log("Connecting to DB...");
    await mongoose.connect(config.MONGO_URI);
};

export const disconnectFromDB = async (): Promise<void> => {
    await mongoose.disconnect();
};
