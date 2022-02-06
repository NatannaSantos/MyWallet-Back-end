import { Router } from "express";
import authRouter from "./authRouter.js";
import transactionRouter from "./transactionsRouter.js";
import userRouter from "./userRouter.js";

const router = Router();
router.use(authRouter);
router.use(userRouter);
router.use(transactionRouter);

export default router;


