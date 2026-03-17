// npx express-generator --no-view --git
import express from "express";
import cookieParser from "cookie-parser";

import { PORT } from "./config/env.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDB from "./DB/db.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.midllewares.js";
import workflowRouter from "./routes/workflow.routes.js";


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(arcjetMiddleware);

// ..../api/v1/auth/sign-up
app.use('/api/v1/auth', authRouter) // ده API بيستخدم الروتور ده جوا ال
app.use('/api/v1/user', userRouter)
app.use('/api/v1/subscription', subscriptionRouter)
app.use('/api/v1/workflow', workflowRouter)

app.use(errorMiddleware)

app.get('/', (req, res)=>{
    res.send("welcome to subscripton tracker!")
})

app.listen(PORT , async ()=>{
    console.log(`server is running on ${PORT}`)


    await connectToDB(); // انت ممكن تستخدم دي هنا بس لما السيرفر يتعمل لما دي بتخلص اما لو استخدمتها بره وده الاحسن دي بتتعمل الاول
})

export default app;