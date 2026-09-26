import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

import mongoose from "mongoose";

import { DumpsImportHistory } from "../src/models/dumps-import-history.model";
import { Order } from "../src/models/order.model";
import { connectToDB, disconnectFromDB } from "./seed/connectDB";

interface IDumpOrder {
    name: string | null;
    surname: string | null;
    email: string | null;
    phone: string | null;
    age: number | null;
    course: string | null;
    course_format: string | null;
    course_type: string | null;
    status: string | null;
    sum: number | null;
    already_paid: number | null;
    msg: string | null;
    utm: string | null;
    created_at: string | null;
}

const normalizeString = (value: string | null): string | null => {
    return value === "" ? null : value;
};

const dumpPath = path.join(process.cwd(), "dumps", "orders.dump");

const getFileHash = async (filePath: string): Promise<string> => {
    const file = await fs.readFile(filePath);

    return crypto.createHash("sha256").update(file).digest("hex");
};

const transformOrdersDump = async () => {
    const dump = await fs.readFile(dumpPath, "utf8");

    const data = dump
        .replace(/^db\.orders\.insertMany\(/, "")
        .replace(/\)\s*$/, "");

    const orders: IDumpOrder[] = JSON.parse(data);

    return orders.map((order) => ({
        name: normalizeString(order.name),
        surname: normalizeString(order.surname),
        email: normalizeString(order.email),
        phone: normalizeString(order.phone),
        age: order.age ?? null,
        course: normalizeString(order.course),
        courseFormat: normalizeString(order.course_format),
        courseType: normalizeString(order.course_type),
        orderStatus: normalizeString(order.status),
        sum: order.sum ?? null,
        alreadyPaid: order.already_paid ?? null,
        groupId: null,
        managerId: null,
        msg: normalizeString(order.msg),
        utm: normalizeString(order.utm),
        comments: [],
        createdAt: order.created_at ? new Date(order.created_at) : null,
        updatedAt: order.created_at ? new Date(order.created_at) : null,
    }));
};

const importOrdersDump = async (): Promise<void> => {
    const fileName = path.basename(dumpPath);
    const fileHash = await getFileHash(dumpPath);

    const alreadyImportedDump = await DumpsImportHistory.findOne({ fileHash });

    if (alreadyImportedDump) {
        throw new Error(`Dump ${fileName} has already been imported`);
    }

    const transformedOrders = await transformOrdersDump();

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        await Order.insertMany(transformedOrders, {
            session,
            timestamps: false,
        });

        await DumpsImportHistory.create(
            [
                {
                    fileName,
                    fileHash,
                    itemsCount: transformedOrders.length,
                },
            ],
            { session },
        );

        await session.commitTransaction();
    } catch (e) {
        await session.abortTransaction();
        throw e;
    } finally {
        await session.endSession();
    }

    console.log(`Successfully imported ${transformedOrders.length} orders.`);
};

const run = async (): Promise<void> => {
    try {
        await connectToDB();
        await importOrdersDump();
    } catch (e) {
        console.error("Orders import session failed", e);
        process.exit(1);
    } finally {
        await disconnectFromDB();
    }
};

run();
