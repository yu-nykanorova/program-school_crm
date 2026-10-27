import {Form} from "../../ui/Form.tsx";
import {Input} from "../../ui/Input.tsx";
import {ErrorMessage} from "../../ui/ErrorMessage.tsx";
import {Select} from "../../ui/Select.tsx";
import {buildGroupOptions, buildOrderOptions} from "../../../utils/buildSelectOptions.ts";
import {courses} from "../../../constants/courses.ts";
import {courseFormats} from "../../../constants/courseFormats.ts";
import {courseTypes} from "../../../constants/courseTypes.ts";
import {type OrderStatusesFilter, orderStatusesFilter} from "../../../constants/orderStatuses.ts";
import {useAppDispatch} from "../../../store/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../../../store/hooks/useAppSelector.tsx";
import {type FC, useEffect, useState} from "react";
import {groupSliceActions} from "../../../store/slices/groupSlice.ts";
import {useForm} from "react-hook-form";
import type {IOrder, IOrderEdit} from "../../../interfaces/IOrder.ts";
import {type OrderEditFormValues, orderEditSchema} from "../../../validators/order.validator.ts";
import {orderSliceActions} from "../../../store/slices/orderSlice.ts";
import {groupCreateSchema} from "../../../validators/group.validator.ts";
import styles from "./OrderEditForm.module.scss";
import {Button} from "../../ui/Button.tsx";
import {OrderEditFormItem} from "./OrderEditFormItem.tsx";

type OrderEditProps = {
        order: IOrder;
        onClose: () => void;
}

export const OrderEditForm: FC<OrderEditProps> = ({ order, onClose }) => {
        const dispatch = useAppDispatch();

        const [isCreateGroup, setIsCreateGroup] = useState(false);
        const [groupName, setGroupName] = useState("");
        const [groupCreateError, setGroupCreateError] = useState("");

        const {
                register,
                handleSubmit,
                reset,
                setError,
                clearErrors,
                setValue,
                formState: { errors, isSubmitting, dirtyFields },
        } = useForm<OrderEditFormValues>();

        const {
                groups,
                loading: groupsLoading,
                error: groupsError,
        } = useAppSelector(({ groupSlice }) => groupSlice);

        useEffect(() => {
                dispatch(
                    groupSliceActions.loadGroups(),
                );
        }, [dispatch]);

        useEffect(() => {
                reset({
                        name: order.name ?? "",
                        surname: order.surname ?? "",
                        email: order.email ?? "",
                        phone: order.phone ?? "",
                        age: order.age == null ? "" : String(order.age),
                        sum: order.sum == null ? "" : String(order.sum),
                        alreadyPaid: order.alreadyPaid == null ? "" : String(order.alreadyPaid),
                        orderStatus: order.orderStatus as OrderStatusesFilter ?? "",
                        course: order.course ?? "",
                        courseFormat: order.courseFormat ?? "",
                        courseType: order.courseType ?? "",
                        groupId: order.group?._id ?? "",
                });
        }, [order, reset]);

        const onSubmitEditOrder = async (data: OrderEditFormValues) => {
                const changedData = Object.fromEntries(
                    (Object.keys(dirtyFields) as (keyof OrderEditFormValues)[]).map((key) => [key, data[key]]),
                );

                clearErrors();

                if (Object.keys(changedData).length === 0) {
                        return;
                }

                const result = orderEditSchema.safeParse(changedData);

                if (!result.success) {
                        result.error.issues.forEach((issue) => {
                                const field = issue.path[0] as keyof OrderEditFormValues;

                                if (field) {
                                        setError(field, {
                                                type: "manual",
                                                message: issue.message,
                                        });
                                }
                        });

                        return;
                }

                const body: IOrderEdit = result.data as IOrderEdit;

                try {
                        await dispatch(orderSliceActions.editOrder({id: order.databaseId, body})).unwrap();

                        onClose();
                } catch (error) {
                        const errorMessage = typeof error === "string" ? error : "Something went wrong";

                        setError("root.server", {
                                type: "server",
                                message: errorMessage,
                        });
                }
        };

        const handleCreateGroup = async () => {
                const result = groupCreateSchema.safeParse({
                        name: groupName,
                });

                if(!result.success) {
                        setGroupCreateError(result.error.issues[0]?.message ?? "Invalid group name");
                        return;
                }

                try {
                        const createdGroup = await dispatch(groupSliceActions.createGroup(result.data)).unwrap();
                        await dispatch(groupSliceActions.loadGroups()).unwrap();
                        setValue("groupId", createdGroup._id, {
                                shouldDirty: true,
                        });
                        setGroupName("");
                        setGroupCreateError("");
                        setIsCreateGroup(false);
                } catch (error) {
                        setGroupCreateError(typeof error === "string" ? error : "Failed to create group");
                }
        };

        return (
                <Form
                    className={styles.editOrderForm}
                    onSubmit={handleSubmit(onSubmitEditOrder)}
                    noValidate
                >
                        <div className={styles.editOrderFields}>
                                {isCreateGroup ? (
                                    <OrderEditFormItem label="Group" className={styles.createGroup}>
                                            <Input
                                                value={groupName}
                                                placeholder="Group"
                                                onChange={(e) => {
                                                        setGroupName(e.target.value);
                                                        setGroupCreateError("");
                                                }}
                                            />
                                            <div className={styles.addSelectGroupButtons}>
                                                    <Button
                                                        onClick={handleCreateGroup}
                                                    >
                                                            Add
                                                    </Button>
                                                    <Button
                                                        onClick={() => { setIsCreateGroup(false);setGroupCreateError("");
                                                        }}
                                                    >
                                                            Select
                                                    </Button>
                                            </div>
                                            <ErrorMessage message={groupCreateError} />
                                    </OrderEditFormItem>
                                ) : (
                                    <OrderEditFormItem label="Group" className={styles.selectGroup}>
                                            <Select
                                                defaultOptionName="groups"
                                                optionValues={buildGroupOptions(groups)}
                                                {...register("groupId")}
                                            />
                                            {groupsLoading ? (
                                                <p>Loading groups...</p>
                                            ) : groupsError ? (
                                                <p>{groupsError}</p>
                                            ) : groups.length === 0 ? (
                                                <p>No groups available</p>
                                            ) : null }
                                            <ErrorMessage message={errors.groupId?.message}/>
                                            <Button className={styles.addGroupButton} onClick={() => setIsCreateGroup(true)}>
                                                    Add group
                                            </Button>
                                    </OrderEditFormItem>
                                )}

                                <OrderEditFormItem label="Status">
                                        <Select
                                            defaultOptionName="statuses"
                                            optionValues={buildOrderOptions(orderStatusesFilter)}
                                            {...register("orderStatus")}
                                        />
                                </OrderEditFormItem>

                                <OrderEditFormItem label="Name">
                                        <Input
                                            type="text"
                                            placeholder="Name"
                                            {...register("name")}
                                        />
                                        <ErrorMessage message={errors.name?.message}/>
                                </OrderEditFormItem>

                                <OrderEditFormItem label="Sum">
                                        <Input
                                            type="number"
                                            inputMode="decimal"
                                            placeholder="Sum"
                                            {...register("sum")}
                                        />
                                        <ErrorMessage message={errors.sum?.message}/>
                                </OrderEditFormItem>

                                <OrderEditFormItem label="Surname">
                                        <Input
                                            type="text"
                                            placeholder="Surname"
                                            {...register("surname")}
                                        />
                                        <ErrorMessage message={errors.surname?.message}/>
                                </OrderEditFormItem>

                                <OrderEditFormItem label="Already paid">
                                        <Input
                                            type="number"
                                            inputMode="decimal"
                                            placeholder="Already paid"
                                            {...register("alreadyPaid")}
                                        />
                                        <ErrorMessage message={errors.alreadyPaid?.message}/>
                                </OrderEditFormItem>

                                <OrderEditFormItem label="Email">
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            {...register("email")}
                                        />
                                        <ErrorMessage message={errors.email?.message}/>
                                </OrderEditFormItem>

                                <OrderEditFormItem label="Course">
                                        <Select
                                            defaultOptionName="courses"
                                            optionValues={buildOrderOptions(courses)}
                                            {...register("course")}
                                        />
                                </OrderEditFormItem>

                                <OrderEditFormItem label="Phone">
                                        <Input
                                            type="text"
                                            placeholder="Phone"
                                            {...register("phone")}
                                        />
                                        <ErrorMessage message={errors.phone?.message}/>
                                </OrderEditFormItem>

                                <OrderEditFormItem label="Course format">
                                        <Select
                                            defaultOptionName="formats"
                                            optionValues={buildOrderOptions(courseFormats)}
                                            {...register("courseFormat")}
                                        />
                                </OrderEditFormItem>

                                <OrderEditFormItem label="Age">
                                        <Input
                                            type="number"
                                            inputMode="numeric"
                                            placeholder="Age"
                                            {...register("age")}
                                        />
                                        <ErrorMessage message={errors.age?.message}/>
                                </OrderEditFormItem>

                                <OrderEditFormItem label="Course type">
                                        <Select
                                            defaultOptionName="types"
                                            optionValues={buildOrderOptions(courseTypes)}
                                            {...register("courseType")}
                                        />
                                </OrderEditFormItem>
                        </div>
                        <ErrorMessage message={errors.root?.server?.message} />
                        <div className={styles.editOrderButtons}>
                                <Button onClick={onClose}>
                                        Close
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Loading..." : "Submit"}
                                </Button>
                        </div>
                </Form>
        );
};
