import dayjs, { ManipulateType } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const TIMEZONE = "Europe/Kyiv";

type ConfigString = {
    value: number;
    unit: ManipulateType;
};

class TimeHelper {
    public subtractByParams(value: number, unit: ManipulateType): Date {
        return dayjs().subtract(value, unit).toDate();
    }

    public parseConfigString(configString: string): ConfigString {
        const [value, unit] = configString.split(" ");
        return {
            value: parseInt(value),
            unit: unit as ManipulateType,
        };
    }

    public buildFilterDateFrom(from: string) {
        const date = dayjs(from).utc().format("YYYY-MM-DD");

        return dayjs.tz(date, TIMEZONE).toDate();
    }

    public buildFilterDateTo(to: string) {
        const date = dayjs(to).utc().format("YYYY-MM-DD");

        const nextDate = dayjs.utc(date).add(1, "day").format("YYYY-MM-DD");

        return dayjs.tz(nextDate, TIMEZONE).toDate();
    }
}

export const timeHelper = new TimeHelper();
