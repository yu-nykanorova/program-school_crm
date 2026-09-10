import { IUser, IUserCreateDTO } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public async create(user: IUserCreateDTO): Promise<IUser> {
        return await User.create(user);
    }

    public async getByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }
}

export const userRepository = new UserRepository();
