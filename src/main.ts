import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";

import { config } from "./configs/config";
import { ApiError } from "./errors/api.errors";
import { apiRouter } from "./routers/api.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());
app.use("/", apiRouter);

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message ?? "Something went wrong";
    res.status(status).json({ status, message });
});

process.on("uncaughtException", (error: ApiError) => {
    console.log(`An uncaughtException occurred: ${error}`);
    process.exit(1);
});

const dbConnection = async () => {
    let dbCon = false;

    while (!dbCon) {
        try {
            console.log("Connecting to DB...");
            await mongoose.connect(config.MONGO_URI);
            dbCon = true;
            console.log("Database available!!!");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            console.log("Database unavailable, wait 5 seconds");
            await new Promise((resolve) => setTimeout(resolve, 5000));
        }
    }
};

const start = async () => {
    try {
        await dbConnection();
        app.listen(config.PORT, () => {
            console.log(`Server started on port: ${config.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start().catch((error) => {
    console.error("Failed to start", error);
    process.exit(1);
});
