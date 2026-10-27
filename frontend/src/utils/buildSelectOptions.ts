import type {ISelectOptions} from "../components/ui/Select.tsx";
import type {IGroup} from "../interfaces/IGroup.ts";

export const buildOrderOptions = (values: Record<string, string>): ISelectOptions[] => {
    return Object.values(values).map((value) => ({
        optionValue: value,
        optionName: value,
    }))
}

export const buildGroupOptions = (groups: IGroup[]): ISelectOptions[] => {
    return groups.map((group) => ({
        optionValue: group._id,
        optionName: group.name,
    }));
};