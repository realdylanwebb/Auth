import { SupportedDataStores } from "../../types/SupportedDataStores";
import IRefreshStore from "./IRefreshStore";
import MongoRefreshStore from "./MongoRefreshStore";

export default function refreshStoreFactory(): IRefreshStore {
  const dataStore = process.env.DATA_STORE as SupportedDataStores;
  switch (dataStore) {
    case SupportedDataStores.Mongo:
      return new MongoRefreshStore();
    default:
      throw new Error(`Unsupported data store: ${dataStore}`);
  }
}
