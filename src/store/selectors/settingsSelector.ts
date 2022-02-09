import createCachedSelector from "re-reselect";
import { RootReducerType } from "../reducers";
import { SettingsState } from "../types";

const settingsSelector = (state: RootReducerType): SettingsState =>
  state.settingsReducer;

export const settingsThemeSelector = createCachedSelector(
  settingsSelector,
  (settingsReducer) => settingsReducer.theme
)((_state_) => "settings.theme");

export const settingsIntroSeenSelector = createCachedSelector(
  settingsSelector,
  (settingsReducer) => settingsReducer.introSeen
)((_state_) => "settings.introSeen");

export const settingsLocationPermissionSelector = createCachedSelector(
  settingsSelector,
  (settingsReducer) => settingsReducer.locationPermission
)((_state_) => "settings.locationPermission");

export const settingsLocationPermissionAskAgainSelector = createCachedSelector(
  settingsSelector,
  (settingsReducer) => settingsReducer.locationPermissionAskAgain
)((_state_) => "settings.locationPermissionAskAgain");
