import transactionSchema from "../schemas/transactionSchema.js";

export default function validateTransactionSchemaMiddleware(req,res,next){
    const values = req.body;
    
    const validation = transactionSchema.validate(values, { abortEarly: false });
    if (validation.error) {
        res.sendStatus(422).send(validation.error.details.map(error => error.message));
        return;
    }
    next();
}