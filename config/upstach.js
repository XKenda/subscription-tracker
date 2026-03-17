

import { Client as WorkFlowClient } from "@upstash/workflow"

import { QSTASH_TOKEN, QSTASH_URL } from "./env.js"

// QStash connection
export const workflowClient = new WorkFlowClient({
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN
})


//  Upstash الي موجودة على  Qstash في الملف ده عملنا اتصال بخدمة 
// هتساعدنا فيها Qstash عشان ننفذ المهام الي 
// الي هي زي 
// تبعت اشعار او تذكير بعد 27 يوم مثلا 
// او تشغل حاجة في وقت معين
// QStash السيرفر مش هيعرف يحتفظ بمهمة لمدة 27 يوم ويضمن يعيد المحاولة لو فشلت او انو يفضل شغال صول الوقت فهنا بنسلم المهمة ل





// External Service Integration   ESI
// بتربط تطبيقك بخدمة خارجية



// 🧠 تشبيه بسيط جدًا
// تخيل إنك عايز تبعت طرد بالبريد:
// QStash = شركة الشحن
// workflowClient = رقم خدمة العملاء
// token = إثبات هويتك
// لو معندكش رقمهم
// مش هتعرف تبعت الطرد.