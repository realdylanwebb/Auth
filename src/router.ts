import express, { Router, Request, Response } from 'express';
import { z } from 'zod';

const router: Router = express.Router();

const handleZodError = (error: z.ZodError) => {
    return {
        status: 400,
        message: 'Validation failed',
        errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
        }))
    };
};

const loginBody = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

router.post('/login', (req: Request, res: Response) => {
    try {
        const body = loginBody.safeParse(req.body)
        if (!body.success) {
            res.status(400).json(handleZodError(body.error))
        } else {
            const { email, password } = body.data
            res.json({
                token: 'jwt_token_here',
                refreshToken: 'refresh_token_here'
            })
        }
    } catch (e) {
        console.error('Login error:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const registerBody = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string(),
});

router.post('/register', (req: Request, res: Response) => {
    try {
        const body = registerBody.safeParse(req.body)
        if (!body.success) {
            res.status(400).json(handleZodError(body.error))
        } else {
            const { email, password, name } = body.data
            res.status(201).json({
                message: 'User registered successfully'
            });
        }
    } catch (e) {
        console.error('Login error:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/me', (_: Request, res: Response) => {
    res.json({
        id: 'user_id',
        email: 'user@example.com',
        name: 'User Name',
        roles: ['user']
    });
});

const refreshTokenBody = z.object({
    refreshToken: z.string(),
});

router.post('/refresh-token', (req: Request, res: Response) => {
    try {
        const body = refreshTokenBody.safeParse(req.body)
        if (!body.success) {
            res.status(400).json(handleZodError(body.error))
        } else {
            const { refreshToken } = body.data
            res.json({
                token: 'new_jwt_token_here'
            })
        }
    } catch (e) {
        console.error('Refresh token error:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const logoutBody = z.object({
    refreshToken: z.string(),
});

router.post('/logout', (req: Request, res: Response) => {
    try {
        const body = logoutBody.safeParse(req.body)
        if (!body.success) {
            res.status(400).json(handleZodError(body.error))
        } else {
            const { refreshToken } = body.data
            res.json({
                message: 'Successfully logged out'
            })
        }
    } catch (e) {
        console.error('Logout error:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const forgotPasswordBody = z.object({
    email: z.string().email(),
});

router.post('/forgot-password', (req: Request, res: Response) => {
    try {
        const body = forgotPasswordBody.safeParse(req.body)
        if (!body.success) {
            res.status(400).json(handleZodError(body.error))
        } else {
            const { email } = body.data
            res.json({
                message: 'Password reset instructions sent to email'
            })
        }
    } catch (e) {
        console.error('Forgot password error:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
