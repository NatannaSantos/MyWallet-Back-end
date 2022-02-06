import db from "../db.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';



export async function register(req, res) {

    const passwordHash = bcrypt.hashSync(user.password, 10);

    try {
        await db.collection('users').insertOne({ ...user, password: passwordHash });
        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    const user = await db.collection("users").findOne({ email });
    if (!user) {
        return res.sendStatus(401);
    }
    try {
        if (bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            await db.collection("sessions").insertOne({ idUser: user._id, token })
            delete user.email;
            delete user.password;

            const data = { ...user, token };
            return res.send(data);
        }
        res.sendStatus(401);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}