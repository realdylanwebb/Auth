import IDataStore from "../../types/IDataStore";

export default interface IRefreshStore extends IDataStore {
    getUserByRefreshToken(refreshToken: string): Promise<string | null>;
    setRefreshToken(userId: string, refreshToken: string, expiresAt: Date): Promise<void>;
    deleteRefreshToken(userId: string): Promise<void>;
}
