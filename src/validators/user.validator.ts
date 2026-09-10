import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";

export class UserValidator {
    private static email = joi.string().email().trim();
    private static password = joi.string().regex(RegexEnum.PASSWORD);
    private static name = joi.string().regex(RegexEnum.NAME).trim();
    private static surname = joi.string().regex(RegexEnum.NAME).trim();

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
        password: this.password.required(),
    });
}
