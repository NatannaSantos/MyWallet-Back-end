import db from '../db.js';
import { ObjectId } from 'mongodb';


export async function transaction(req, res) {    

    try {
        const user = await db.collection('users').findOne({ _id: new ObjectId(req.body.userId) });
        if (user) {
            await db.collection("transaction").insertOne({ ...req.body, idUser: user._id });
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
    const session = res.locals.session;

    try {

        const entries = await db.collection("transaction").find({ idUser: session.idUser }).toArray();

        if (!entries) {
            res.sendStatus(404);
            return
        }
        res.send(entries);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function deleteTransaction(req, res) {
    const { id } = req.params;
   

    try {
        
        const transactionUser = await db.collection("transaction").findOne({ _id: new ObjectId(id) })
        if (!transactionUser) {
            res.sendStatus(404);
        }
        await db.collection("transaction").deleteOne({ _id: transactionUser._id });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}



