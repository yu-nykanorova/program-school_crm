import { Model } from "mongoose";

export abstract class BaseRepository<T> {
    constructor(protected readonly model: Model<T>) {}

    public async deleteOlderThan(date: Date): Promise<number> {
        const { deletedCount } = await this.model.deleteMany({
            createdAt: { $lt: date },
        });
        return deletedCount;
    }
}
