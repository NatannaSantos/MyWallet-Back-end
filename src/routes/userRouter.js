import { Router } from "express";
import { users } from "../controllers/usersController.js";
import validateToken from "../middleWares/validateToken.js";

const userRouter=Router();
userRouter.get('/users',validateToken, users);

export default userRouter;