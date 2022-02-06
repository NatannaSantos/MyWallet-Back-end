import express,{json} from 'express';
import cors from'cors';
import { login, register } from './controllers/authController.js';
import {  transaction, getTransaction } from './controllers/transactionsController.js';
import { users } from './controllers/usersController.js';

const server=express();
server.use(cors());
server.use(json());


server.post('/auth/register',register);
server.post('/auth/login',login);
server.post('/transaction',transaction);
server.get('/transaction',getTransaction);
server.get('users', users)

server.listen(5000,()=>{
    console.log("listening to port 5000");
})