import Mail from "nodemailer/lib/mailer";
import NodeMailerProvider from "../../provider/NodeMailerProvider";
import IEmailProvider from "./IEmailProvider";
import { SendVerificationEmailArgs, SendPasswordResetEmailArgs } from "./types";

export default class NodeMailerEmailProvider implements IEmailProvider {

    async sendVerificationEmail(args: SendVerificationEmailArgs): Promise<void> {
        const transporter = await NodeMailerProvider.getTransporter();
        const { email, userId, token } = args;
        const verificationUrl = `http://localhost:3000/verify-email?token=${token}&userId=${userId}`;
        const html = `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`;
        const mailOptions: Mail.Options = {
            from: 'noreply@example.com',
            to: email,
            subject: 'Verify your email',
            html: html
        };
        await transporter.sendMail(mailOptions);
    }

    async sendPasswordResetEmail(args: SendPasswordResetEmailArgs): Promise<void> {
        const { email, userId, token } = args;
        const transporter = await NodeMailerProvider.getTransporter();
        const resetUrl = `http://localhost:3000/reset-password?token=${token}&userId=${userId}`;
        const html = `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`;
        const mailOptions: Mail.Options = {
            from: 'noreply@example.com',
            to: email,
            subject: 'Reset your password',
            html: html
        };
        await transporter.sendMail(mailOptions);
    }
}