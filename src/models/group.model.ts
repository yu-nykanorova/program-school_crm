import { model, Schema } from "mongoose";

import { IGroup } from "../interfaces/group.interface";

const groupSchema = new Schema(
    {
    name: { type: String, required: true, unique: true, trim: true },
    },
    {
        versionKey: false,
    },
);

export const Group = model<IGroup>("Group", groupSchema, "groups");
