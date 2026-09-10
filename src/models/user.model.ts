import { model, Schema } from "mongoose";

import { ManagerStatusEnum } from "../enums/manager-status.enum";
import { UserRoleEnum } from "../enums/user-role.enum";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        lastLogin: { type: Date, default: null },
        role: {
            type: String,
            enum: Object.values(UserRoleEnum),
            required: true,
        },
        status: { type: String, enum: Object.values(ManagerStatusEnum) },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const User = model<IUser>("User", userSchema, "users");
