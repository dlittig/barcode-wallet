import { parkingsReducer } from "./barcodeReducer";
import { settingsReducer } from "./settingsReducer";
import { BarcodeState, SettingsState } from "../types";

export type RootReducerType = {
  barcodeReducer: BarcodeState;
  settingsReducer: SettingsState;
};

export const RootReducer = {
  parkingsReducer,
  settingsReducer,
};

export default RootReducer;
