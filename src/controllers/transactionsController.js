import joi from 'joi';
import db from '../db.js';
import { ObjectId } from 'mongodb';

/*const valueSchema = joi.object({
    value:joi.string().required(),
    description:joi.string().required(),
    type:joi.string().valid("entry","outflow").required(),
})*/
export async function transaction(req, res) {
   const autenticação=req.body;
   console.log(autenticação);

    /*const validation = valueSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        res.status(422).send(validation.error.details.map(error => error.message))
        return;
    }*/
   
    try {       
        const user = await db.collection('users').findOne({ _id: new ObjectId(req.body.userId) });
        console.log(user._id)
        if(user){
            await db.collection("transaction").insertOne({...req.body, idUser:user._id});
            res.sendStatus(201)
            return;
        }
        res.sendStatus(401);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
export async function getTransaction(req, res) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace('Bearer ', '');

    const session = await db.collection("sessions").findOne({ token });
        if (!session) {
            return res.sendStatus(401);
        }
        

    try {        

        const entries = await db.collection("transaction").find({idUser: session.idUser}).toArray();
        console.log(entries);
        if(!entries){
            res.sendStatus(404);
            return 
        }

        res.send(entries)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}



