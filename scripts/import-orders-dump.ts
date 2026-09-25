import path from "node:path";
import fs from "node:fs/promises";

const normalizeString = (str: string | null): string | null => {
    return str === "" ? null : str;
};

const importOrdersDump = async(): Promise<void> => {
    const dumpPath = path.join(process.cwd(), "dumps", "orders.dump");

    const dump = await fs.readFile(dumpPath, "utf8");

    const data = dump.replace(/^db\.orders\.insertMany\(/, "").replace(/\)\s*$/, "");

    const orders = JSON.parse(data);

    const transformedOrders = orders.map((order: any) => ({

    }))
}