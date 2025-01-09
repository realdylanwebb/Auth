import IDataStore from "../../types/IDataStore";

export default interface IAccessTokenBlackList extends IDataStore {
    addAccessToken(accessToken: string, expiresAt: Date): Promise<void>;
    isAccessTokenBlacklisted(accessToken: string): Promise<boolean>;
    purgeExpiredTokens(): Promise<void>;
}