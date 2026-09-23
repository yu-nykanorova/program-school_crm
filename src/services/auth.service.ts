import { ManagerStatusEnum } from "../enums/manager-status.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserRoleEnum } from "../enums/user-role.enum";
import { ApiError } from "../errors/api.errors";
import { IActivate, IAuth } from "../interfaces/auth.interface";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { oldHashesRepository } from "../repositories/old-hashes.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
    public async login(
        dto: IAuth,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        const user = await userRepository.getByEmail(dto.email);

        if (!user) {
            throw new ApiError(
                "Email or password invalid",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }

        if (
            user.role === UserRoleEnum.MANAGER &&
            user.status === ManagerStatusEnum.NEW
        ) {
            throw new ApiError(
                "Account is not activated",
                StatusCodesEnum.FORBIDDEN,
            );
        }

        if (
            user.role === UserRoleEnum.MANAGER &&
            user.status === ManagerStatusEnum.BANNED
        ) {
            throw new ApiError("Account is banned", StatusCodesEnum.FORBIDDEN);
        }

        if (!user.password) {
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

    public async refresh(
        refreshToken: string,
        payload: ITokenPayload,
    ): Promise<ITokenPair> {
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

    public async activate(
        dto: IActivate,
        payload: ITokenPayload,
        actionToken: string,
    ): Promise<void> {
        const user = await userService.getUserOrThrow(payload.userId);

        if (
            user.role === UserRoleEnum.MANAGER &&
            user.status === ManagerStatusEnum.BANNED
        ) {
            throw new ApiError("Account is banned", StatusCodesEnum.FORBIDDEN);
        }

        if (
            user.role === UserRoleEnum.MANAGER &&
            user.status === ManagerStatusEnum.ACTIVE
        ) {
            const currentPassword = user.password;

            if (!currentPassword) {
                throw new ApiError(
                    "Manager password is missing",
                    StatusCodesEnum.INTERNAL_SERVER_ERROR,
                );
            }

            await this.checkPasswordsEquality(
                dto.password,
                currentPassword,
                user._id,
            );
        }

        const oldPassword = user.password;

        const newPassword = await passwordService.hashPassword(dto.password);

        await userRepository.updateUser(payload.userId, {
            password: newPassword,
        });

        if (oldPassword) {
            await oldHashesRepository.create({
                _userId: payload.userId,
                hash: oldPassword,
            });
        }

        await actionTokenRepository.deleteActionToken({
            actionToken,
        });
    }

    private async checkPasswordsEquality(
        newPassword: string,
        currentPassword: string,
        userId: string,
    ): Promise<void> {
        const isCurrentPassword = await passwordService.comparePassword(
            newPassword,
            currentPassword,
        );

        if (isCurrentPassword) {
            throw new ApiError(
                "New password must differ from the previous one",
                StatusCodesEnum.BAD_REQUEST,
            );
        }

        const oldHashes = await oldHashesRepository.findByParams({
            _userId: userId,
        });

        if (oldHashes) {
            for (const oldHash of oldHashes) {
                const isPasswordEqual = await passwordService.comparePassword(
                    newPassword,
                    oldHash.hash,
                );

                if (isPasswordEqual) {
                    throw new ApiError(
                        "New password must differ from the previous one",
                        StatusCodesEnum.BAD_REQUEST,
                    );
                }
            }
        }
    }
}

export const authService = new AuthService();
