import {Form} from "../ui/Form.tsx";
import type {FC} from "react";
import {useForm} from "react-hook-form";
import {useAppDispatch} from "../../store/hooks/useAppDispatch.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {type CreateManagerData, createManagerSchema} from "../../validators/manager.validator.ts";
import {adminSliceActions} from "../../store/slices/adminSlice.ts";
import {Input} from "../ui/Input.tsx";
import {ErrorMessage} from "../ui/ErrorMessage.tsx";
import {Button} from "../ui/Button.tsx";
import styles from "./CreateManagerForm.module.scss";

type CreateManagerProps = {
    onSuccess: () => void;
    onCancel: () => void;
}

export const CreateManagerForm: FC<CreateManagerProps> = ({ onSuccess, onCancel }) => {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<CreateManagerData>({
        resolver: zodResolver(createManagerSchema),
    });

    const onSubmit = async (data: CreateManagerData) => {
        try {
            await dispatch(
                adminSliceActions.createManager(data),
            ).unwrap();

            onSuccess();
        } catch (error) {
            const errorMessage =
                typeof error === "string"
                    ? error
                    : "Failed to create manager";

            setError("surname", {
                type: "server",
                message: errorMessage,
            });
        }
    };


    return (
        <Form className={styles.createManagerForm} onSubmit={handleSubmit(onSubmit)}>
            <label>Email</label>
            <Input
                type="email"
                placeholder="Email"
                {...register("email")}
            />
            <ErrorMessage message={errors.email?.message} />

            <label>Name</label>
            <Input
                placeholder="Name"
                {...register("name")}
            />
            <ErrorMessage message={errors.name?.message} />

            <label>Surname</label>
            <Input
                placeholder="Surname"
                {...register("surname")}
            />
            <ErrorMessage message={errors.surname?.message} />

            <div className={styles.createManagerButtons}>
                <Button onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">
                    {isSubmitting ? "Loading..." : "Create"}
                </Button>
            </div>
        </Form>
    );
};
