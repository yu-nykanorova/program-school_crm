import { model, Schema } from "mongoose";

import { IActionToken } from "../interfaces/action-token.interface";

const actionTokenSchema = new Schema(
    {
        actionToken: { type: String, required: true },
        _userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const ActionToken = model<IActionToken>(
    "ActionToken",
    actionTokenSchema,
    "action-tokens",
);
