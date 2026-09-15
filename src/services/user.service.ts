import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public async isEmailUnique(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email);

        if (user) {
            throw new ApiError(
                "A user with this email already exists",
                StatusCodesEnum.CONFLICT,
            );
        }
    }
}

export const userService = new UserService();
