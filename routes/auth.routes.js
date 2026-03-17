import { Router } from "express";
import { signUp, signIn, signOut } from "../controllers/auth.controller.js";

const authRouter = Router();


// دي احسن طريقة تكتب بيها الهاندلر او جسم الروت انك تعملهم في الكونترولر منفصلين عن هنا
authRouter.post('/sign-up', signUp)
authRouter.post('/sign-in', signIn)
authRouter.post('/sign-out', signOut)



export default authRouter;