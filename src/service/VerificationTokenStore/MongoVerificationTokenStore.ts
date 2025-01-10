import IVerificationTokenStore from "./IVerificationTokenStore";
import { InsertVerificationTokenArgs, InsertPasswordResetTokenArgs } from "./types";

export default class MongoVerificationTokenStore implements IVerificationTokenStore {
    async init(): Promise<void> {
        return Promise.resolve();
    }

    async insertVerificationToken(args: InsertVerificationTokenArgs): Promise<void> {
        return Promise.resolve();
    }

    async insertPasswordResetToken(args: InsertPasswordResetTokenArgs): Promise<void> {
        return Promise.resolve();
    }

    async purgeExpiredTokens(): Promise<void> {
        return Promise.resolve();
    }
}