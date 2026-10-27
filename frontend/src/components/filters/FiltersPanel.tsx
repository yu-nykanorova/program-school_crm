import {Button} from "../ui/Button.tsx";
import {ArrowRotateIcon} from "../icons/ArrowRotateIcon.tsx";
import {ExportIcon} from "../icons/ExportIcon.tsx";
import styles from "./FiltersPanel.module.scss";
import {Form} from "../ui/Form.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {defaultOrderFilters} from "../../constants/defaultOrderFilters.ts";
import {type OrderFiltersData, orderFiltersSchema} from "../../validators/order.validator.ts";
import {Input} from "../ui/Input.tsx";
import {Select} from "../ui/Select.tsx";
import {ErrorMessage} from "../ui/ErrorMessage.tsx";
import {orderStatusesFilter} from "../../constants/orderStatuses.ts";
import {courses} from "../../constants/courses.ts";
import {courseFormats} from "../../constants/courseFormats.ts";
import {courseTypes} from "../../constants/courseTypes.ts";
import type {IGroup} from "../../interfaces/IGroup.ts";
import {type FC, useState} from "react";
import {buildGroupOptions, buildOrderOptions} from "../../utils/buildSelectOptions.ts";
import {getOrdersFilters} from "../../utils/getOrdersFilter.ts";
import {orderService} from "../../services/orderService.ts";
import axios from "axios";
import {useSearchParams} from "react-router-dom";

type FiltersPanelProps = {
    groups: IGroup[];
    groupsLoading: boolean;
    groupsError: string | null;
    onResetFilters: () => void;
};

export const FiltersPanel: FC<FiltersPanelProps> = ({ groups, groupsLoading, groupsError, onResetFilters }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [exportError, setExportError] = useState<string | null>(null);

    const initialFilters: OrderFiltersData = {
        ...defaultOrderFilters,
        name: searchParams.get("name") ?? "",
        surname: searchParams.get("surname") ?? "",
        email: searchParams.get("email") ?? "",
        phone: searchParams.get("phone") ?? "",
        age: searchParams.get("age") ?? "",
        course: searchParams.get("course") ?? "",
        courseFormat: searchParams.get("courseFormat") ?? "",
        courseType: searchParams.get("courseType") ?? "",
        orderStatus: searchParams.get("orderStatus") ?? "",
        groupId: searchParams.get("groupId") ?? "",
        dateFrom: searchParams.get("dateFrom") ?? "",
        dateTo: searchParams.get("dateTo") ?? "",
        myOrders: searchParams.get("myOrders") === "true",
    };

    const {
        register,
        reset,
        getValues,
        formState: { errors },
    } = useForm<OrderFiltersData>({
        defaultValues: initialFilters,
        resolver: zodResolver(orderFiltersSchema),
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        const target = e.target;

        if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLSelectElement)) {
            return;
        }

        const { name } = target;

        if(!name) {
            return;
        }

        const value =
            target instanceof HTMLInputElement && target.type === "checkbox"
                ? target.checked
                    ? "true" : ""
                : target.value;

        setSearchParams((prevParams) => {
            const nextParams = new URLSearchParams(prevParams);

            if (value === "") {
                nextParams.delete(name);
            } else {
                nextParams.set(name, value);
            }

            nextParams.set("page", "1");

            return nextParams;
        });
    };

    const handleResetFilters = () => {
        reset(defaultOrderFilters);
        onResetFilters();
    };

    const handleExport = async () => {
        setExportError(null);

        try {
            const query = getOrdersFilters(getValues());
            const blob = await orderService.getOrdersExport(query);

            const now = new Date();
            const date = now.toLocaleDateString("uk-UA").replace(/\./g,"-");
            const time = now.toLocaleTimeString("uk-UA").replace(/:/g, "-");

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `orders_${date}_${time}.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data instanceof Blob) {
                try {
                    const textError = await error.response.data.text();
                    const parseError = JSON.parse(textError);
                    if (
                        typeof parseError === "object" &&
                        parseError !==null &&
                        typeof parseError.message === "string"
                    ) {
                        setExportError(parseError.message);
                    } else {
                        setExportError("File export failed");
                    }
                } catch {
                    setExportError("File export failed");
                }
            } else {
                setExportError("File downloading failed");
            }
        }
    };

    return (
        <Form
            className={styles.filtersPanel}
            onChange={handleFilterChange}
            onSubmit={(e) => e.preventDefault()}
        >
            <div className={styles.filtersContainer}>
                <Input
                    type="text"
                    className={styles.filtersPanelItem}
                    placeholder="Name"
                    error={!!errors.name}
                    {...register("name")}
                />
                <Input
                    type="text"
                    className={styles.filtersPanelItem}
                    placeholder="Surname"
                    error={!!errors.surname}
                    {...register("surname")}
                />
                <Input
                    type="text"
                    className={styles.filtersPanelItem}
                    placeholder="Email"
                    {...register("email")}
                />
                <ErrorMessage message={errors.email?.message}/>
                <Input
                    type="text"
                    className={styles.filtersPanelItem}
                    placeholder="Phone"
                    error={!!errors.phone}
                    {...register("phone")}
                />
                <Input
                    type="number"
                    inputMode="numeric"
                    className={styles.filtersPanelItem}
                    placeholder="Age"
                    error={!!errors.age}
                    {...register("age")}
                />
                <ErrorMessage message={errors.age?.message}/>
                <Select
                    className={styles.filtersPanelItem}
                    defaultOptionName="courses"
                    optionValues={buildOrderOptions(courses)}
                    {...register("course")}
                />
                <Select
                    className={styles.filtersPanelItem}
                    defaultOptionName="formats"
                    optionValues={buildOrderOptions(courseFormats)}
                    {...register("courseFormat")}
                />
                <Select
                    className={styles.filtersPanelItem}
                    defaultOptionName="types"
                    optionValues={buildOrderOptions(courseTypes)}
                    {...register("courseType")}
                />
                <Select
                    className={styles.filtersPanelItem}
                    defaultOptionName="statuses"
                    optionValues={buildOrderOptions(orderStatusesFilter)}
                    {...register("orderStatus")}
                />
                <Select
                    className={styles.filtersPanelItem}
                    defaultOptionName={groupsLoading ? "Loading groups..." : "groups"}
                    optionValues={buildGroupOptions(groups)}
                    {...register("groupId")}
                />
                {groupsError &&
                    <ErrorMessage
                        message={groupsError}
                        className={styles.filterGroupsError}
                    /> }
                <Input
                    type="date"
                    className={styles.filtersPanelItem}
                    placeholder="Start date"
                    {...register("dateFrom")}
                />
                <Input
                    type="date"
                    className={styles.filtersPanelItem}
                    placeholder="End date"
                    {...register("dateTo")}
                />
            </div>
            <label className={styles.myCheckbox}>
                <input
                    className={styles.myCheckboxBox}
                    type="checkbox"
                    {...register("myOrders")}

                />
                My
            </label>
            <div className={styles.filterButtonsBox}>
                <Button
                    className={styles.filterButton}
                    onClick={handleResetFilters}
                >
                    <ArrowRotateIcon/>
                </Button>
                <Button
                    className={styles.filterButton}
                    onClick={handleExport}
                >
                    <ExportIcon/>
                </Button>
            </div>
            {exportError &&
                <ErrorMessage
                    message={exportError}
                    className={styles.fileExportError}
                />}
        </Form>
    );
};
