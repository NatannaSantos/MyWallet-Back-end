import userSchema from "../schemas/userSchema.js";

export default function validateUserSchemaMiddleware(req, res, next){
    const user = req.body;

    const validation = userSchema.validate(user);
    if (validation.error) {
        res.sendStatus(422);
        return;
    }
    next();
}
