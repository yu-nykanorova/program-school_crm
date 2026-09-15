import { IAuth } from "../interfaces/auth.interface";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { ManagerStatusEnum } from "../enums/manager-status.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { tokenRepository } from "../repositories/token.repository";

class AuthService {
    public async login(dto: IAuth): Promise<{ user: IUser; tokens: ITokenPair }> {
        const user = await userRepository.getByEmail(dto.email);

        if (!user || user.status === ManagerStatusEnum.NEW || user.status === ManagerStatusEnum.BANNED) {
            throw new ApiError(
                "Email or password invalid",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }

        const isValidPassword = await passwordService.comparePassword(
            dto.password,
            user.password,
        );

        if (!isValidPassword) {
            throw new ApiError(
                "Email or password invalid",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }

        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        });

        await tokenRepository.create({ ...tokens, _userId: user._id });

        return { user, tokens };
    }

    public async refresh(refreshToken: string, payload: ITokenPayload,): Promise<ITokenPair> {
        await tokenRepository.deleteTokenPair(refreshToken);

        const tokens = tokenService.generateTokens({
            userId: payload.userId,
            role: payload.role,
        });

        await tokenRepository.create({ ...tokens, _userId: payload.userId });

        return tokens;
    }

    public async logout(refreshToken: string): Promise<void> {
        await tokenRepository.deleteTokenPair(refreshToken);
    }

    public async activate(): Promise<> {}
}

export const authService = new AuthService();