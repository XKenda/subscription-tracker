// in this file there will be workflow routers which reasponsible for varity things 
// in the begining there is just " send renewal email" work flow


import { Router } from "express"
import { sendReminder } from "../controllers/workflow.controller";

const workflowRouter = Router();

workflowRouter.post('/subscription/remider', sendReminder);

export default workflowRouter;