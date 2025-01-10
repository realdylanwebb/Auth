import { InsertPasswordResetTokenArgs, InsertVerificationTokenArgs } from "./types";

export default interface IVerificationTokenStore {
    insertVerificationToken(args: InsertVerificationTokenArgs): Promise<void>;
    insertPasswordResetToken(args: InsertPasswordResetTokenArgs): Promise<void>;
    purgeExpiredTokens(): Promise<void>;
}