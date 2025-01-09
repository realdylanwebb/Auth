import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as TokenService from '../TokenService';
import { z } from 'zod';

describe('TokenService', () => {

    beforeEach(() => {
        process.env.JWT_SECRET = 'test_secret';
        process.env.JWT_EXPIRATION_HOURS = '1';
    })

  it('should generate and verify a token', async () => {
    const payload = { userId: '123' };
    const token = await TokenService.generateToken(payload);
    expect(token).toBeDefined();

    const decoded = await TokenService.verifyToken(token, z.object({ userId: z.string() }));
    expect(decoded.userId).toEqual(payload.userId);
  });

  it('Should generate a random 32 byte refresh token', () => {
    const token = TokenService.generateRefreshToken();
    expect(token).toBeDefined();
    expect(token.length).toEqual(64);
  });
});