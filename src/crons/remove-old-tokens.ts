import { CronJob } from "cron";

import { config } from "../configs/config";
import { timeHelper } from "../helpers/time.helper";
import { tokenRepository } from "../repositories/token.repository";

const handler = async () => {
    try {
        const lifeTime = config.JWT_REFRESH_LIFETIME;
        const { value, unit } = timeHelper.parseConfigString(lifeTime);
        const date = timeHelper.subtractByParams(value, unit);
        const deleted = await tokenRepository.deleteOlderThan(date);
        console.log(`Deleted ${deleted} old password hashes`);
    } catch (e) {
        console.error(e);
    }
};

export const removeOldTokens = new CronJob("0 0 * * *", handler);
