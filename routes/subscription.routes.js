// subscription routes
// this file contatin routes or APIs of subscriptions 
// APIs like [get all subscriptions, get subscription with ID, create one, edit, delete, or cencel]

import { Router } from "express";
import authorize from "../middlewares/auth.middlewares.js";
import { createSubscription, getUserSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();


subscriptionRouter.get('/' , (req, res)=> res.send({title: 'GET all subscription'}))

subscriptionRouter.get('/:id' ,authorize, getUserSubscription)

subscriptionRouter.post('/' ,authorize, createSubscription)

subscriptionRouter.put('/:id' , (req, res)=> res.send({title: 'Update subscription'}))

subscriptionRouter.delete('/:id' , (req, res)=> res.send({title: 'Delete subscription'}))

subscriptionRouter.get('/user/:id' , (req, res)=> res.send({title: 'get subscription belongs to user'}))

subscriptionRouter.put('/:id/cancel' , (req, res)=> res.send({title: 'cancel user subscription'}))

subscriptionRouter.get('/upcoming-renewals' , (req, res)=> res.send({title: 'get upcoming renewals'}))


export default subscriptionRouter;