import MongoConnection from "../../db/Mongo";
import IAccessTokenBlackList from "./IAccessTokenBlackList";

interface MongoAccessTokenBlacklistRecord {
    accessToken: string;
    expiresAt: Date;
}

export default class MongoAccessTokenBlacklist implements IAccessTokenBlackList {
    
    async init(): Promise<void> {
        return Promise.resolve();
    }

    async addAccessToken(accessToken: string, expiresAt: Date): Promise<void> {
        const client = await MongoConnection.getInstance().getClient();
        const collection = client.db(process.env.MONGO_DB_NAME).collection<MongoAccessTokenBlacklistRecord>('accessTokenBlacklist');
        await collection.insertOne({ accessToken, expiresAt });
    }

    async isAccessTokenBlacklisted(accessToken: string): Promise<boolean> {
        const client = await MongoConnection.getInstance().getClient();
        const collection = client.db(process.env.MONGO_DB_NAME).collection<MongoAccessTokenBlacklistRecord>('accessTokenBlacklist');
        const result = await collection.findOne({ accessToken });
        return result !== null;
    }

    async purgeExpiredTokens(): Promise<void> {
        const client = await MongoConnection.getInstance().getClient();
        const collection = client.db(process.env.MONGO_DB_NAME).collection<MongoAccessTokenBlacklistRecord>('accessTokenBlacklist');
        await collection.deleteMany({ expiresAt: { $lt: new Date() } });
    }
}