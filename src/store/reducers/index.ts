import { barcodesReducer } from "./barcodesReducer";
import { settingsReducer } from "./settingsReducer";
import { BarcodeState, SettingsState } from "../types";

export type RootReducerType = {
  barcodesReducer: BarcodeState;
  settingsReducer: SettingsState;
};

export const RootReducer = {
  barcodesReducer,
  settingsReducer,
};

export default RootReducer;
