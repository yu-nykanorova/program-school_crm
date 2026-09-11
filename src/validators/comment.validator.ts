import joi from "joi";

export class CommentValidators {
    private static text = joi.string().trim().min(1).max(1000);

    public static create = joi.object({
        text: this.text.required(),
    });
}
