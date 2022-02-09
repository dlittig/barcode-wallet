import { CommonActionType, SettingsActionType } from "../actions/types";
import { COMMON_RESET_STATE } from "../constants/commonConstants";
import {
  SETTINGS_APPLY_THEME,
  SETTINGS_SEEN_INTRO,
} from "../constants/settingsConstants";
import { SettingsState } from "../types";

const initialState: SettingsState = {
  theme: "dark",
  introSeen: false,
  locationPermission: false,
  locationPermissionAskAgain: true,
  imagePermission: false,
  imagePermissionAskAgain: true,
  notificationPermission: false,
  notificationPermissionAskAgain: true,
};

export const settingsReducer = (
  state = initialState,
  action: SettingsActionType | CommonActionType
): SettingsState => {
  let newState = {} as SettingsState;
  let theme;
  let seen;

  switch (action.type) {
    case SETTINGS_APPLY_THEME:
      theme = action.payload;
      newState = { ...state, theme };

      return newState;
    case SETTINGS_SEEN_INTRO:
      seen = action.payload;
      newState = { ...state, introSeen: seen };

      return newState;
    case COMMON_RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
