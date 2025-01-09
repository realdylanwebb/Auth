import { MongoClient } from 'mongodb';

class MongoConnection {
    private static instance: MongoConnection;
    private client: MongoClient;
    private isConnected: boolean = false;

    private constructor() {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MONGO_URI is not set");
        }
        this.client = new MongoClient(uri);
    }

    public static getInstance(): MongoConnection {
        if (!MongoConnection.instance) {
            MongoConnection.instance = new MongoConnection();
        }
        return MongoConnection.instance;
    }

    private async ensureConnection() {
        if (!this.isConnected) {
            try {
                await this.client.connect();
                this.isConnected = true;
                console.log("Successfully connected to MongoDB.");
            } catch (error) {
                console.error("Connection to MongoDB failed:", error);
                throw error;
            }
        }
    }

    public async getClient(): Promise<MongoClient> {
        await this.ensureConnection();
        return this.client;
    }

    public async close() {
        if (this.isConnected) {
            await this.client.close();
            this.isConnected = false;
        }
    }
}

export default MongoConnection;
