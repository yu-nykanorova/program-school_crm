import styles from "./CommentForm.module.scss";

import {Input} from "../../../ui/Input.tsx";
import {Button} from "../../../ui/Button.tsx";
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "../../../ui/Form.tsx";
import {ErrorMessage} from "../../../ui/ErrorMessage.tsx";
import {type CommentData, commentSchema} from "../../../../validators/comment.validator.ts";
import {useAppDispatch} from "../../../../store/hooks/useAppDispatch.tsx";
import {orderSliceActions} from "../../../../store/slices/orderSlice.ts";
import type {FC} from "react";
//import {useAppSelector} from "../../../../store/hooks/useAppSelector.tsx";

type CommentFormProps = {
    orderId: string;
    allowedToEdit: boolean;
}

export const CommentForm: FC<CommentFormProps> = ({ orderId, allowedToEdit }) => {
    const dispatch = useAppDispatch();

    // const { user } = useAppSelector(({ authSlice }) => authSlice);

    const {
        register,
        handleSubmit,
        reset,
        control,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<CommentData>({
        resolver: zodResolver(commentSchema),
    });

    const commentText = useWatch({
        control,
        name: "text",
    }) ?? "";

    const isSubmitDisabled = !allowedToEdit || !commentText.trim() || isSubmitting;

    const onSubmit = async (data: CommentData) => {
        try {
            await dispatch(orderSliceActions.createComment({id: orderId, body: data})).unwrap();

            reset();

            // if (user) {
            //     dispatch(orderSliceActions.setOrderManager({
            //         orderId,
            //         manager: {
            //             _id: user._id,
            //             email: user.email,
            //             name: user.name,
            //             surname: user.surname,
            //         },
            //     }));
            // }
        } catch (error) {
            const errorMessage = typeof error === "string" ? error : "Something went wrong";

            setError("text", {
                type: "server",
                message: errorMessage,
            });
        }
    };

    return (
        <Form className={styles.commentForm} onSubmit={handleSubmit(onSubmit)}>
            <Input
                placeholder="Comment"
                {...register("text")}
            />
            <ErrorMessage message={errors.text?.message}/>

            <Button type="submit" disabled={isSubmitDisabled}>
                {isSubmitting ? "Loading..." : "Submit"}
            </Button>
        </Form>
    );
};