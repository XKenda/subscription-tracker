import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` })
// الي في المشروع .env الكونفج ده بتستدعيه في المشروع عشان تقدر تاكسس على ملف 

// تلقائي ولو مثلا سميته باسم تاني مش هيجيبه .env لو استدعيت الكونفج بدون اي اوبشنز جواه بيجيب ملف 
// ولازم تكتب اسم الكلف في المسار جوا ا الاوبشنز 

// فوق بقا هنا انت هيبقا عندك ملفين واحدة للتطوير وواحد للانتاج وعشان كدة كتبتها بالطريقة دي

export const { PORT,
    SERVER_URL,
    NODE_ENV,
    DB_URI,
    JWT_SECRET, 
    JWT_EXPIRES_IN,
    ARCJET_KEY,
    ARCJET_ENV,
    QSTASH_URL,
    QSTASH_TOKEN,
    EMAIL_PASSWORD,
    // QSTASH_CURRENT_SIGNING_KEY, QSTASH_NEXT_SIGNING_KEY
} = process.env;



// development فطبيعيى هيخليه NODE_ENV لان في الاول هو مش قارئ  .env.development.local هو هنا قرأ عادي ملف 


// لما ترفع مشروعك على سيرفر أو Cloud Platform، المنصة نفسها بتحط:

// NODE_ENV=production

// كـ Environment Variable على مستوى النظام.

// قبل ما Node يبدأ تشغيل التطبيق.
