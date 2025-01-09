import { ObjectId } from "mongodb";
import MongoConnection from "../../db/Mongo";
import { User } from "../../types/User";
import IAuthStore from "./IAuthStore";

export default class MongoAuthStore implements IAuthStore {
    init(): Promise<void> {
        return Promise.resolve();
    }

    async createUser(user: User): Promise<void> {
        const client = await MongoConnection.getInstance().getClient();
        const collection = client.db(process.env.MONGO_DB_NAME).collection<User>('users');
        await collection.insertOne(user);
    }
    
    async getUserById(id: string): Promise<User | null> {
        const client = await MongoConnection.getInstance().getClient();
        const collection = client.db(process.env.MONGO_DB_NAME).collection<User>('users');
        const result = await collection.findOne({ _id: new ObjectId(id) });
        return result;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const client = await MongoConnection.getInstance().getClient();
        const collection = client.db(process.env.MONGO_DB_NAME).collection<User>('users');
        const result = await collection.findOne({ email });
        return result;
    }

    async resetPassword(id: string, password: string): Promise<void> {
        const client = await MongoConnection.getInstance().getClient();
        const collection = client.db(process.env.MONGO_DB_NAME).collection<User>('users');
        await collection.updateOne({ _id: new ObjectId(id) }, { $set: { password } });
    }

    async updateUser(id: string, user: Partial<User>): Promise<void> {
        const client = await MongoConnection.getInstance().getClient();
        const collection = client.db(process.env.MONGO_DB_NAME).collection<User>('users');
        await collection.updateOne({ _id: new ObjectId(id) }, { $set: user });
    }

    async deleteUser(id: string): Promise<void> {
        const client = await MongoConnection.getInstance().getClient();
        const collection = client.db(process.env.MONGO_DB_NAME).collection<User>('users');
        await collection.deleteOne({ _id: new ObjectId(id) });
    }
}