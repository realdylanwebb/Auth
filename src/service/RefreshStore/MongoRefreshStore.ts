import { ObjectId } from "mongodb";
import MongoConnection from "../../db/Mongo";
import { User } from "../../types/User";
import IRefreshStore from "./IRefreshStore";

interface MongoRefreshTokenRecord {
    userId: string;
    token: string;
    expiresAt: Date;
}

export default class MongoRefreshStore implements IRefreshStore {
    init(): Promise<void> {
        return Promise.resolve();
    }

    async getUserByRefreshToken(refreshToken: string): Promise<string | null> {
        const client = await MongoConnection.getInstance().getClient();
        const collection = client.db(process.env.MONGO_DB_NAME).collection<User>('users');
        const result = await collection.findOne({ refreshToken });
        return result ? result.id.toString() : null;
    }

    async setRefreshToken(userId: string, refreshToken: string, expiresAt: Date): Promise<void> {
        const client = await MongoConnection.getInstance().getClient();
        const collection = client.db(process.env.MONGO_DB_NAME).collection<MongoRefreshTokenRecord>('refreshTokens');
        await collection.insertOne({ userId, token: refreshToken, expiresAt });
    }

    async deleteRefreshToken(token: string): Promise<void> {
        const client = await MongoConnection.getInstance().getClient();
        const collection = client.db(process.env.MONGO_DB_NAME).collection<MongoRefreshTokenRecord>('refreshTokens');
        await collection.deleteMany({ token });
    }

    async deleteRefreshTokensByUserId(userId: string): Promise<void> {
        const client = await MongoConnection.getInstance().getClient();
        const collection = client.db(process.env.MONGO_DB_NAME).collection<MongoRefreshTokenRecord>('refreshTokens');
        await collection.deleteMany({ userId });
    }
}