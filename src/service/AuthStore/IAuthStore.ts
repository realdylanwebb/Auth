import IDataStore from "../../types/IDataStore";
import { User } from "../../types/User";

export default interface IAuthStore extends IDataStore {
    createUser(user: User): Promise<void>;
    getUserById(id: string): Promise<User | null>;
    getUserByEmail(email: string): Promise<User | null>;
    resetPassword(id: string, password: string): Promise<void>;
    updateUser(id: string, user: Partial<User>): Promise<void>;
    deleteUser(id: string): Promise<void>;
}
