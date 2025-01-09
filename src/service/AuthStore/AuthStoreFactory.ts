import { SupportedDataStores } from "../../types/SupportedDataStores";
import IAuthStore from "./IAuthStore";
import MongoAuthStore from "./MongoAuthStore";

export default function authStoreFactory(dataStore: SupportedDataStores): IAuthStore {
    switch (dataStore) {
        case SupportedDataStores.Mongo:
            return new MongoAuthStore();
        default:
            throw new Error(`Unsupported data store: ${dataStore}`);
    }
}