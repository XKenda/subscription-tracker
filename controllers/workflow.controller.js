// this is controller of 'workflow' routes



// this for use 'require' method of old JS on new module ES6
// import { creatRequire } from "module";
// const require = creatRequire(import.meta.url);
// const { serve } = require('@upstash/workflow/express')
import dayjs from "dayjs"; // دي مكتبة بدل ما تتعامل مع Date
import { serve } from "@upstash/workflow/express"
import Subscription from "../models/subscription.model";
import { sendReminderEmail } from "../uitils/send-email";

const REMINDERS = [1, 2, 3, 5, 7];

export const sendReminder = serve(async (context) => { //Upstash عشان تقدر تتعامل مع  workflow endpoint عشان تحول الفانكشن العادية بتاعتك ل serve  استخدمت فانكشن 
    const { subscriptionId } = context.requestPayload;
    
    // workflow is number of steps
    // here is stop 1 "get subscription"
    // use context to run steps in workflow
    const subscription = await fetchSubscription(context, subscriptionId)

    if(!subscription || subscription.status !== 'active') return;

    // used dayjs modul to convert the "Date" object to dayjs
    const renewalDate = dayjs(subscription.renewalDate)

    // لو ميعاد التجديد عدي نوقف التنفيذ
    if(renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow`)
        return;
    }

    // لوب على الايام ال عندي
    for (const daysBefore of REMINDERS) {
        // هتحسب منه ميعاد التذكير بطرح يوم التجديد من الايام
        const reminderDate = renewalDate.subtract(daysBefore, "day");

        // لو يوم التذكير بعد اليوم الحالي هيشغل ميسود النوم
        if(reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `${daysBefore} days before remider`, reminderDate);
        }

        if(dayjs().isSame(reminderDate, 'day')) {
        // لو اليوم مبقاش بعد اليوم الحالي او هو نفس اليوم هيشغل ميسود التذكير
        await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
        }
    }
});

// workflow عشان تبقا خطوة من ال context.run  استخدمت
const fetchSubscription = async (context, subscriptionId) => {
    return await context.run("get subscritption", async () => {
        return Subscription.findById(subscriptionId).populate('user', "name email")
    })
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`sleeping until  ${label} at ${date}`)
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label, subscription) => {
    return await context.run(label, async ()=> {
        console.log(`triggering ${label}`)
        await sendReminderEmail({
            to: subscription.user.email,
            type: label,
            subscription
        })
    })
}





// label هو اسم كل خطوة ولازم تكتبه عشان هو يعتبر معرف مميز للخطوة
// في الكود هنا تم استخدامه بطريقة معقدة شوية  بس قوية جدا افهمها

// context ده يعتبر workflow engine contoller وتقدر تعمل بيه الحاجات الكتير زي الي فوق كدة وحاجات تانية workflow هو الي بيتحكم في سير ال 

// 🎯 الخلاصة في جملة واحدة

// الـ context هو:

// مدير تنفيذ الـ Workflow
// اللي بيمسك العملية من أولها لآخرها
// حتى لو استمرت أيام
// وحتى لو حصل Crash