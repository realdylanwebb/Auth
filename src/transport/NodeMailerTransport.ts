import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export default class NodeMailerTransport {
    private static transporter: nodemailer.Transporter | null = null;

    private constructor() {}

    public static async getTransporter(): Promise<nodemailer.Transporter> {
        if (!this.transporter) {
            if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
                throw new Error('Missing email configuration');
            }

            this.transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || '587'),
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            } as SMTPTransport.Options);

            try {
                await this.transporter.verify();
            } catch (error) {
                this.transporter = null;
                throw new Error(`Failed to create email transport: ${error}`);
            }
        }

        return this.transporter;
    }
}