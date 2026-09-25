import { model, Schema } from "mongoose";

import { IDumpsImportHistory } from "../interfaces/dumpsImportHistory.interface";

const dumpsImportHistorySchema = new Schema(
    {
        fileName: { type: String, required: true },
        fileHash: { type: String, required: true, unique: true },
        itemsCount: { type: Number, required: true },
        importedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: false,
        versionKey: false,
    },
);

export const DumpsImportHistory = model<IDumpsImportHistory>(
    "DumpsImportHistory",
    dumpsImportHistorySchema,
    "dumps-import-history",
);
