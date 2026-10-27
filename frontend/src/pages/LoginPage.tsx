import {Form} from "../components/ui/Form.tsx";
import {Button} from "../components/ui/Button.tsx";
import styles from "./LoginPage.module.scss";
import {Input} from "../components/ui/Input.tsx";
import {useForm} from "react-hook-form";
import {type LoginData, loginSchema} from "../validators/auth.validator.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAppDispatch} from "../store/hooks/useAppDispatch.tsx";
import {authSliceActions} from "../store/slices/authSlice.ts";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginData) => {
        try {
            await dispatch(authSliceActions.login(data)).unwrap();
            navigate("/orders", { replace: true });
        } catch (error) {
            const errorMessage = typeof error === "string" ? error : "Something went wrong";

            setError("password", {
                type: "server",
                message: errorMessage,
            });
        }
    };

    return (
        <div className={`container ${styles.loginPage}`}>
            <Form
                className={styles.loginForm}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <label>Email</label>
                <Input
                    type="email"
                    placeholder="email"
                    error={!!errors.email}
                    {...register("email")}
                />
                <ErrorMessage message={errors.email?.message}/>

                <label>Password</label>
                <Input
                    type="password"
                    placeholder="Password"
                    error={!!errors.password}
                    {...register("password")}
                />
                <ErrorMessage message={errors.password?.message}/>

                <Button className={styles.loginButton} type="submit">
                    {isSubmitting ? "Loading..." : "Login"}
                </Button>
            </Form>
        </div>
    );
};
