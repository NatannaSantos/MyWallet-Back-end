import { Router } from "express";
import {  transaction, getTransaction, deleteTransaction } from '../controllers/transactionsController.js';
import validateToken from "../middleWares/validateToken.js";
import validateTransactionSchemaMiddleware from "../middleWares/validateTransactionSchemaMiddleware.js";

const transactionRouter=Router();
transactionRouter.post('/transaction',validateTransactionSchemaMiddleware,transaction);
transactionRouter.get('/transaction',validateToken, getTransaction);
transactionRouter.delete('/transaction/:id',validateToken, deleteTransaction);

export default transactionRouter;