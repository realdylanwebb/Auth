import { SendPasswordResetEmailArgs, SendVerificationEmailArgs } from "./types";

export default interface IEmailProvider {
    sendVerificationEmail(args: SendVerificationEmailArgs): Promise<void>;
    sendPasswordResetEmail(args: SendPasswordResetEmailArgs): Promise<void>;
}