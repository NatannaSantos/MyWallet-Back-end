import { Router } from "express";
import { login, register } from '../controllers/authController.js';
import validateLoginSchemaMiddleware from "../middleWares/validateLoginSchemaMiddleware.js";
import validateUserSchemaMiddleware from "../middleWares/validateUserSchemaMiddleware.js";


const authRouter=Router();
authRouter.post('/auth/register',validateUserSchemaMiddleware,register);
authRouter.post('/auth/login',validateLoginSchemaMiddleware,login);

export default authRouter;