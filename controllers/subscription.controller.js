import { SERVER_URL } from "../config/env.js";
import { workflowClient } from "../config/upstach.js";
import Subscription from "../models/subscription.model.js";


export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        })

        
        await workflowClient.trigger({
            //sendReminder ده وهو غالبا مربوط بالفانكشن  endpoint روح شغل ال
            url: `${SERVER_URL}/api/v1/workflows/subscription/remider`, // هيعمل تريجر على الاند وينت دي
            // context.requestpayload وتقدر توصله بال  payload ده بقا ال
            body: {
                subscriptionId: subscription.id,
            },
            // تحديد نوع البيانات
            headers: {
                'content-type': 'application/json',
            },
            // عدد المحاولات يعني لو فضل مرة متحاولش تانيط
            retries: 0,
        })

        res.status(201).json({ success: true, data: subscription})
    } catch (error) {
        next(error)
    }
};


export const getUserSubscription = async (req, res, next) => {
    try {
        if(req.user.id !== req.params.id) {
            const error = new Error("No Owner Error");
            error.statusCode = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({user: req.params.id})

        res.status(200).json({success: true, data: subscriptions})

    } catch (error) {
        next(error)
    }
}