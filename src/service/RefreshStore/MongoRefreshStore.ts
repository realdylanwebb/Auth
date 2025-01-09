import IRefreshStore from "./IRefreshStore";

export default class MongoRefreshStore implements IRefreshStore {
    init(): Promise<void> {
        return Promise.resolve();
    }
    getUserByRefreshToken(refreshToken: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    setRefreshToken(userId: string, refreshToken: string, expiresAt: Date): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteRefreshToken(userId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}