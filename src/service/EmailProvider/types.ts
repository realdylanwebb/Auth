export interface SendVerificationEmailArgs {
    email: string;
    userId: string;
    token: string;
}

export interface SendPasswordResetEmailArgs {
    email: string;
    userId: string;
    token: string;
}