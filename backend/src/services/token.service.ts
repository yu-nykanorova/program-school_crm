import jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.errors";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { tokenRepository } from "../repositories/token.repository";

class TokenService {
    public generateTokens(payload: ITokenPayload): ITokenPair {
        const accessToken = this.signToken(
            payload,
            config.JWT_ACCESS_SECRET,
            config.JWT_ACCESS_LIFETIME,
        );
        const refreshToken = this.signToken(
            payload,
            config.JWT_REFRESH_SECRET,
            config.JWT_REFRESH_LIFETIME,
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    public verifyToken(token: string, type: TokenTypeEnum): ITokenPayload {
        try {
            let secret: string;

            switch (type) {
                case TokenTypeEnum.ACCESS:
                    secret = config.JWT_ACCESS_SECRET;
                    break;
                case TokenTypeEnum.REFRESH:
                    secret = config.JWT_REFRESH_SECRET;
                    break;
                case TokenTypeEnum.ACTION:
                    secret = config.ACTION_SECRET;
                    break;
                default:
                    throw new ApiError(
                        "Invalid token type",
                        StatusCodesEnum.BAD_REQUEST,
                    );
            }
            return jwt.verify(token, secret) as ITokenPayload;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            throw new ApiError("Invalid token", StatusCodesEnum.UNAUTHORIZED);
        }
    }

    public generateActionToken(payload: ITokenPayload): string {
        return this.signToken(
            payload,
            config.ACTION_SECRET,
            config.ACTION_LIFETIME,
        );
    }

    public async isTokenExists(
        token: string,
        type: TokenTypeEnum,
    ): Promise<boolean> {
        const isTokenPromise = await tokenRepository.findByParams({
            [type]: token,
        });
        return !!isTokenPromise;
    }

    private signToken(
        payload: ITokenPayload,
        secret: string,
        expiresIn: jwt.SignOptions["expiresIn"],
    ): string {
        return jwt.sign(payload, secret, { expiresIn });
    }
}

export const tokenService = new TokenService();
