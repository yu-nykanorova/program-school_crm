import { IToken } from "../interfaces/token.interface";
import { Token } from "../models/token.model";
import { BaseRepository } from "./base.repository";

class TokenRepository extends BaseRepository<IToken> {
    constructor() {
        super(Token);
    }

    public async create(dto: Partial<IToken>): Promise<IToken> {
        return await Token.create(dto);
    }

    public async findByParams(params: Partial<IToken>): Promise<IToken | null> {
        return await Token.findOne(params);
    }

    public async deleteTokenPair(refreshToken: string): Promise<void> {
        await Token.deleteOne({ refreshToken });
    }
}

export const tokenRepository = new TokenRepository();
