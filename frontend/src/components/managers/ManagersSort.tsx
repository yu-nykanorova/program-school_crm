import * as React from "react";
import styles from "./ManagersSort.module.scss";
import {useSearchParams} from "react-router-dom";
import {userQuerySort} from "../../constants/userQuerySort.ts";

const sortOptions = [
    {value: `-${userQuerySort.CREATED_AT}`, label: "Newest first"},
    {value: userQuerySort.CREATED_AT, label: "Oldest first"},
    {value: userQuerySort.NAME, label: "Name (A-Z)"},
    {value: `-${userQuerySort.NAME}`, label: "Name (Z-A)"},
] as const;

type ManagersSortOrder = typeof sortOptions[number]["value"];

export const ManagersSort= () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const param = searchParams.get("order");
    const sortOrder: ManagersSortOrder = sortOptions.some((option) => option.value === param) ? (param as ManagersSortOrder) : `-${userQuerySort.CREATED_AT}`


    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>)=> {
        const params = new URLSearchParams(searchParams);

        params.set("order", e.target.value);
        params.set("page", "1");

        setSearchParams(params);
    };

    return (
        <select className={styles.sortManagersSelect} value={sortOrder} onChange={handleSort}>
            {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};
