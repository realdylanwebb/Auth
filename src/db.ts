import { MongoClient, Collection, Db } from "mongodb";
import { User } from "./types/user";
import { Token } from "./types/token";

interface Collections {
  users: Collection<User>;
  tokens: Collection<Token>;
}

class MongoConnection {
  private static instance: MongoConnection;
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private collections: Partial<Collections> = {};

  private constructor() {}

  public static getInstance(): MongoConnection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection();
    }
    return MongoConnection.instance;
  }

  public async connect(uri: string, dbName: string): Promise<void> {
    try {
      if (!this.client) {
        this.client = await MongoClient.connect(uri, {
          maxPoolSize: 10,
          minPoolSize: 5,
          connectTimeoutMS: 5000,
          socketTimeoutMS: 30000,
        });
        this.db = this.client.db(dbName);
        console.log("Successfully connected to MongoDB.");

        this.collections = {
          users: this.db.collection<User>("users"),
          tokens: this.db.collection<Token>("tokens"),
        };

        await this.createIndexes();
      }
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }

  private async createIndexes(): Promise<void> {
    if (!this.collections.users || !this.collections.tokens) return;

    try {
      await this.collections.users.createIndexes([
        { key: { email: 1 }, unique: true },
        { key: { createdAt: 1 } },
      ]);

      await this.collections.tokens.createIndexes([
        { key: { token: 1 }, unique: true },
        { key: { "user.id": 1 } },
        { key: { expiresAt: 1 }, expireAfterSeconds: 0 },
        { key: { createdAt: 1 } },
      ]);
    } catch (error) {
      console.error("Error creating indexes:", error);
      throw error;
    }
  }

  public getCollection<T extends keyof Collections>(
    name: T
  ): Collections[T] | null {
    return (this.collections[name] as Collections[T]) || null;
  }

  public async disconnect(): Promise<void> {
    try {
      if (this.client) {
        await this.client.close();
        this.client = null;
        this.db = null;
        this.collections = {};
        console.log("Disconnected from MongoDB.");
      }
    } catch (error) {
      console.error("Error disconnecting from MongoDB:", error);
      throw error;
    }
  }

  public isConnected(): boolean {
    return this.client?.isConnected() ?? false;
  }
}

export const db = MongoConnection.getInstance();

// Usage example:
/*
async function main() {
  await mongoConnection.connect(
    'mongodb://localhost:27017',
    'auth_service'
  );

  const usersCollection = mongoConnection.getCollection('users');
  const tokensCollection = mongoConnection.getCollection('tokens');

  if (usersCollection && tokensCollection) {
    // Use collections
    const user = await usersCollection.findOne({ email: 'test@example.com' });
    const tokens = await tokensCollection.find({ 'user.id': user?._id }).toArray();
  }
}
*/
