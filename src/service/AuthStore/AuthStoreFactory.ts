import { SupportedDataStores } from "../../types/SupportedDataStores";
import IAuthStore from "./IAuthStore";
import MongoAuthStore from "./MongoAuthStore";

export default function authStoreFactory(): IAuthStore {
  const dataStore = process.env.DATA_STORE;
  switch (dataStore) {
    case SupportedDataStores.Mongo:
      return new MongoAuthStore();
    default:
      throw new Error(`Unsupported data store: ${dataStore}`);
  }
}
