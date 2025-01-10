export interface InsertVerificationTokenArgs {
    userId: string;
    token: string;
    expiresAt: Date;
}

export interface InsertPasswordResetTokenArgs {
    userId: string;
    token: string;
    expiresAt: Date;
}
