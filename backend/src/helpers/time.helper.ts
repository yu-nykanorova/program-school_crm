import dayjs, { ManipulateType } from "dayjs";

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
}

export const timeHelper = new TimeHelper();
