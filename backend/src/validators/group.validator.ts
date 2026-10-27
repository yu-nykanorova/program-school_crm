import joi from "joi";

export class GroupValidator {
    private static name = joi.string().min(2).max(50);

    public static create = joi.object({
        name: this.name.required(),
    });
}
