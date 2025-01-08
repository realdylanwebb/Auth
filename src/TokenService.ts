import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { z } from 'zod';

function getSigningKey(): string {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not set');
    }
    return process.env.JWT_SECRET;
}

function getSigningHours(): number {
    if (!process.env.JWT_EXPIRATION_HOURS) {
        return 1;
    }
    return parseInt(process.env.JWT_EXPIRATION_HOURS);
}

function getSigningHoursString(): string {
    return `${getSigningHours()}h`;
}

const jwtPayloadSchema = z.object({
    jti: z.string(),
    iat: z.number(),
    exp: z.number()
});

type JWTPayload = z.infer<typeof jwtPayloadSchema>;
type TokenPayload<T extends object> = T & JWTPayload;
type TokenPayloadNoExp<T extends object> = T & Omit<JWTPayload, 'exp'>;

export function generateToken<T extends object>(payload: T): string {
    const signingKey = getSigningKey();
    const jti = crypto.randomBytes(16).toString('hex');
    
    const tokenPayload: TokenPayloadNoExp<T> = {
        ...payload,
        jti,
        iat: Math.floor(Date.now() / 1000),
    };
    
    const token = jwt.sign(
        tokenPayload,
        signingKey,
        {
            expiresIn: getSigningHoursString(),
            algorithm: 'HS256',
            noTimestamp: false,
        }
    );
    return token;
}

export function verifyToken<T extends object>(
    token: string, 
    payloadSchema: z.ZodType<T>
): TokenPayload<T> {
    const signingKey = getSigningKey();
    try {
        const decoded = jwt.verify(token, signingKey, {
            algorithms: ['HS256'],
            complete: true,
        });
        
        const fullSchema = z.intersection(payloadSchema, jwtPayloadSchema);
        const payload = fullSchema.parse(decoded.payload);

        if (payload.exp < Math.floor(Date.now() / 1000)) {
            throw new Error('Token has expired');
        }

        return payload;
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error('Invalid token payload structure');
        }
        throw new Error('Invalid token');
    }
}

export function generateRefreshToken(): string {
    return crypto.randomBytes(32).toString('hex');
}
