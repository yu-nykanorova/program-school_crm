import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";
import { UserQuerySortEnum } from "../enums/user-query-sort.enum";
import { queryValidator } from "./query.validator";

export class UserValidator {
    private static email = joi.string().email().trim();
    private static password = joi.string().regex(RegexEnum.PASSWORD);
    private static name = joi.string().regex(RegexEnum.NAME).trim();
    private static surname = joi.string().regex(RegexEnum.NAME).trim();
    private static token = joi.string();

    public static createManager = joi.object({
        email: this.email.required(),
        name: this.name.required(),
        surname: this.surname.required(),
    });

    public static login = joi.object({
        email: this.email.required(),
        password: this.password.required(),
    });

    public static setNewPassword = joi.object({
        token: this.token.required(),
        password: this.password.required(),
        confirmPassword: this.password.required(),
    });

    public static query = queryValidator(UserQuerySortEnum, {
        pageSize: 10,
        defaultOrder: `-${UserQuerySortEnum.CREATED_AT}`,
    });
}
