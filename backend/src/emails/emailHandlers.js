import { resendClient } from "../lib/resend.js";
import { sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientUrl) => {
    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: 'Welcome to SyncLounge',
        html: createWelcomeEmailTemplate(name,clientUrl)
    })

    if(error){
        console.error("Error Sending Welcome email",error);
        throw new Error();
    }

    console.log("Welcome email send successfully",data);
}