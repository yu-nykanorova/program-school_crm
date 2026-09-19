import { CronJob } from "cron";

import { timeHelper } from "../helpers/time.helper";
import { oldHashesRepository } from "../repositories/old-hashes.repository";

const handler = async () => {
    try {
        const date = timeHelper.subtractByParams(180, "days");
        const deleted = await oldHashesRepository.deleteOlderThan(date);
        console.log(`Deleted ${deleted} old password hashes`);
    } catch (e) {
        console.error(e);
    }
};

export const removeOldHashes = new CronJob("0 0 * * *", handler);
