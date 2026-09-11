import { IUser, IUserCreateDTO } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public async getAllUsers(): Promise<IUser[]> {
        return await User.find();
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
    ): Promise<IUser> {
        return await User.findByIdAndUpdate(userId, dto, {
            returnDocument: "after",
        });
    }
}

export const userRepository = new UserRepository();
