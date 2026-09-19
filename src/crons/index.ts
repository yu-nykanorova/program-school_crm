import { removeOldHashes } from "./remove-old-hashes";
import { removeOldTokens } from "./remove-old-tokens";

export const cronRunner = () => {
    removeOldTokens.start();
    removeOldHashes.start();
};
