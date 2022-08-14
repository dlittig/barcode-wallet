import { combineReducers, createStore, Store } from "redux";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";

import reducers, { RootReducerType } from "./reducers";
import { decodeDates, encodeDates } from "./transformer";

const persistConfig = {
  key: "barcode_wallet",
  version: 0, // key has to match the version specified in the migration above
  storage: ExpoFileSystemStorage,
  blacklist: [],
  transforms: [createTransform(encodeDates, decodeDates)],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducers)
);

const store: Store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
