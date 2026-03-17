import nodemailer from "nodemailer"
import { EMAIL_PASSWORD } from "./env.js"

export const accountEmail = 'elmlonxxr@gmail.com';

const transporter = nodemailer.createTransport({
    service: 'gmail', // في الكونيكشن ده لما تكتب كدة دي تغنيك عن كل الاعدادات بتاعة ال جيميل هنا
    auth: {
        user: accountEmail,
        pass: EMAIL_PASSWORD
    }
})

export default transporter;