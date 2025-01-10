import IDataStore from "../../types/IDataStore";
import { InsertPasswordResetTokenArgs, InsertVerificationTokenArgs } from "./types";

export default interface IVerificationTokenStore extends IDataStore {
    insertVerificationToken(args: InsertVerificationTokenArgs): Promise<void>;
    insertPasswordResetToken(args: InsertPasswordResetTokenArgs): Promise<void>;
    purgeExpiredTokens(): Promise<void>;
}