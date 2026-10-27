import {Form} from "../components/ui/Form.tsx";
import {Button} from "../components/ui/Button.tsx";
import styles from "./ActivatePage.module.scss";
import {useForm} from "react-hook-form";
import {type ActivateData, activateSchema} from "../validators/auth.validator.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {authService} from "../services/authService.ts";
import {Input} from "../components/ui/Input.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {NotFoundPage} from "./NotFoundPage.tsx";
import {getError} from "../utils/getError.ts";

export const ActivatePage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<ActivateData>({
        resolver: zodResolver(activateSchema),
    });

    if (!token) {
        return <NotFoundPage/>
    }

    const onSubmit = async (data: ActivateData) => {
        try {
            await authService.activate({token, ...data});
            navigate("/login", { replace: true });
        } catch (error) {
            const errorMessage = getError(error);

            setError("confirmPassword", {
                type: "server",
                message: errorMessage,
            });
        }
    };

    return (
        <div className={`container ${styles.activatePage}`}>
            <Form
                className={styles.activateForm}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <label>Password</label>
                <Input
                    type="password"
                    placeholder="Password"
                    error={!!errors.password}
                    {...register("password")}
                />
                <ErrorMessage message={errors.password?.message}/>

                <label>Confirm password</label>
                <Input
                    type="password"
                    placeholder="Confirm password"
                    error={!!errors.confirmPassword}
                    {...register("confirmPassword")}
                />
                <ErrorMessage message={errors.confirmPassword?.message}/>

                <Button className={styles.activateButton} type="submit">
                    {isSubmitting ? "Loading..." : "Activate"}
                </Button>
            </Form>
        </div>
    );
};
