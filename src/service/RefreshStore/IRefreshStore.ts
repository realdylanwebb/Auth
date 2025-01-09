import IDataStore from "../../types/IDataStore";

export default interface IRefreshStore extends IDataStore {
    getUserByRefreshToken(refreshToken: string): Promise<string | null>;
    setRefreshToken(userId: string, refreshToken: string, expiresAt: Date): Promise<void>;
    deleteRefreshToken(token: string): Promise<void>;
    deleteRefreshTokensByUserId(userId: string): Promise<void>;
}
