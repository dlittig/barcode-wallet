import { combineReducers, createStore, Store } from "redux";
import {
  persistStore,
  persistReducer,
  createTransform,
  createMigrate,
  PersistedState,
} from "redux-persist";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";

import reducers, { RootReducerType } from "./reducers";
import { decodeDates, encodeDates } from "./transformer";

const migrations = {
  // Added search filter to persisted state
  2: (state: any) => {
    console.log("Migrating v0...");
    const typedState: PersistedState & RootReducerType = { ...state };

    if (typeof typedState.barcodesReducer.filter === "undefined") {
      typedState.barcodesReducer.filter = {
        phrase: "",
      };
    }

    if (typeof typedState.barcodesReducer.filter.phrase === "undefined") {
      typedState.barcodesReducer.filter.phrase = "";
    }

    console.log("Done migrating v0.");

    return typedState;
  },
};

const persistConfig = {
  key: "barcode_wallet",
  version: 2, // key has to match the version specified in the migration above
  storage: ExpoFileSystemStorage,
  blacklist: [],
  transforms: [createTransform(encodeDates, decodeDates)],
  migrate: createMigrate(migrations, { debug: false }),
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducers)
);

const store: Store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
