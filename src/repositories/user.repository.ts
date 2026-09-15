import { UserRoleEnum } from "../enums/user-role.enum";
import { IAggregatedResponse } from "../interfaces/aggregated-response";
import {
    IUser,
    IUserCreateDTO,
    IUserQuery,
    IUserResult,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public async getManagers(
        query: IUserQuery,
    ): Promise<IAggregatedResponse<IUserResult>> {
        const skip =
            query.pageSize && query.page
                ? query.pageSize * (query.page - 1)
                : 0;

        const limit = Number(query.pageSize);

        const orderObject: Record<string, any> = {};

        if (query.order.startsWith("-")) {
            orderObject[query.order.slice(1)] = -1;
        } else {
            orderObject[query.order] = 1;
        }

        const [result] = await User.aggregate([
            {
                $match: {
                    role: UserRoleEnum.MANAGER,
                },
            },
            {
                $sort: orderObject,
            },
            {
                $facet: {
                    data: [{ $skip: skip }, { $limit: limit }],
                    totalItems: [{ $count: "count" }],
                },
            },
        ]);

        return {
            data: result?.data ?? [],
            totalItems: result.totalItems[0]?.count ?? 0,
        };
    }

    public async create(user: IUserCreateDTO): Promise<IUser> {
        return await User.create(user);
    }

    public async getByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }

    public async updateUser(
        userId: string,
        dto: Partial<IUser>,
    ): Promise<void> {
        await User.findByIdAndUpdate(userId, dto, {
            returnDocument: "after",
        });
    }
}

export const userRepository = new UserRepository();
