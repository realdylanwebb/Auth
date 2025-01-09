interface LoginArgs {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    refreshToken: string;
} 

interface RegisterArgs {
    email: string;
    password: string;
    name: string;
}

interface RegisterResponse {
    token: string;
    refreshToken: string;
}

interface UserDetailsArgs {
    token: string;
}

interface UserDetailsResponse {
    id: string;
    email: string;
    name: string;
    roles: string[];
}

interface RefreshTokenArgs {
    refreshToken: string;
}

interface RefreshTokenResponse {
    token: string;
}

interface LogoutArgs {
    refreshToken: string;
    accessToken: string;
}

interface LogoutResponse {
    message: string;
}

interface ForgotPasswordArgs {
    email: string;
}

interface ForgotPasswordResponse {
    message: string;
}
