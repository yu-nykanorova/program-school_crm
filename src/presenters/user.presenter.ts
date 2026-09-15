import { IUser, IUserResult } from "../interfaces/user.interface";

class UserPresenter {
    public toPublicResDto(user: IUser): IUserResult {
        return {
            _id: user._id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            role: user.role,
            lastLogin: user.lastLogin ? user.lastLogin.toString() : null,
            createdAt: user.createdAt.toString(),
            updatedAt: user.updatedAt.toString(),
        };
    }
}

export const userPresenter = new UserPresenter();
