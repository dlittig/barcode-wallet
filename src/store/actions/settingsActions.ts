import {
  SETTINGS_APPLY_THEME,
  SETTINGS_SEEN_INTRO,
} from "../constants/settingsConstants";
import { ActionType } from "./types";

export const applyTheme = (theme: string): ActionType => ({
  type: SETTINGS_APPLY_THEME,
  payload: theme,
});

export const setSeenIntro = (value: boolean): ActionType => ({
  type: SETTINGS_SEEN_INTRO,
  payload: value,
});
