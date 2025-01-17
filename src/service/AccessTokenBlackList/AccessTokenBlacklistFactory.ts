import { SupportedDataStores } from "../../types/SupportedDataStores";
import IAccessTokenBlackList from "./IAccessTokenBlackList";
import MongoAccessTokenBlacklist from "./MongoAccessTokenBlacklist";

export default function accessTokenBlacklistFactory(): IAccessTokenBlackList {
  const dataStore = process.env.DATA_STORE as SupportedDataStores;
  switch (dataStore) {
    case SupportedDataStores.Mongo:
      return new MongoAccessTokenBlacklist();
    default:
      throw new Error(`Unsupported data store: ${dataStore}`);
  }
}
