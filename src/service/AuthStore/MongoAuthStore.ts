import { User } from "../../types/user";
import IAuthStore from "./IAuthStore";

export default class MongoAuthStore implements IAuthStore {
    init(): Promise<void> {
        return Promise.resolve();
    }
    createUser(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getUserById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    resetPassword(id: string, password: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateUser(id: string, user: Partial<User>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteUser(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}