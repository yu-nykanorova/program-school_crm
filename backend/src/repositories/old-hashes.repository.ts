import { IOldHash } from "../interfaces/old-hash.interface";
import { OldHash } from "../models/old-hash.model";
import { BaseRepository } from "./base.repository";

class OldHashesRepository extends BaseRepository<IOldHash> {
    constructor() {
        super(OldHash);
    }

    public async create(
        dto: Pick<IOldHash, "_userId" | "hash">,
    ): Promise<void> {
        await OldHash.create(dto);
    }

    public findByParams(params: Partial<IOldHash>): Promise<IOldHash[] | null> {
        return OldHash.find(params);
    }
}

export const oldHashesRepository = new OldHashesRepository();
