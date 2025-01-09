import IAccessTokenBlackList from "./IAccessTokenBlackList";

export default class MongoAccessTokenBlacklist implements IAccessTokenBlackList {
    init(): Promise<void> {
        return Promise.resolve();
    }
    addAccessToken(accessToken: string, expiresAt: Date): Promise<void> {
        return Promise.resolve();
    }
    isAccessTokenBlacklisted(accessToken: string): Promise<boolean> {
        return Promise.resolve(false);
    }
    purgeExpiredTokens(): Promise<void> {
        return Promise.resolve();
    }
}