import { SupportedDataStores } from "../../types/SupportedDataStores";
import IRefreshStore from "./IRefreshStore";
import MongoRefreshStore from "./MongoRefreshStore";

export default function refreshStoreFactory(dataStore: SupportedDataStores): IRefreshStore {
    switch (dataStore) {
        case SupportedDataStores.Mongo:
            return new MongoRefreshStore();
        default:
            throw new Error(`Unsupported data store: ${dataStore}`);
    }
}