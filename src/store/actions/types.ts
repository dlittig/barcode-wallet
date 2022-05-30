import { COMMON_RESET_STATE } from "../constants/commonConstants";
import {
  BARCODE_ADD,
  BARCODE_DELETE,
  BARCODE_READ_FROM_BACKUP,
  BARCODE_UPDATE,
} from "../constants/barcodeConstants";
import {
  SETTINGS_APPLY_THEME,
  SETTINGS_SEEN_INTRO,
} from "../constants/settingsConstants";
import { Barcode } from "../types";
import { BackupPayload } from "../../utils/backup";

type ApplyThemeAction = {
  type: typeof SETTINGS_APPLY_THEME;
  payload: string;
};

type SeenIntroAction = {
  type: typeof SETTINGS_SEEN_INTRO;
  payload: boolean;
};

export type SettingsActionType = ApplyThemeAction | SeenIntroAction;

export type BarcodeActionType =
  | {
      type: typeof BARCODE_ADD | typeof BARCODE_UPDATE | typeof BARCODE_DELETE;
      payload: Barcode;
    }
  | {
      type: typeof BARCODE_READ_FROM_BACKUP;
      payload: BackupPayload;
    };

type CommonResetStateType = {
  type: typeof COMMON_RESET_STATE;
};

export type CommonActionType = CommonResetStateType;
export type ActionType =
  | BarcodeActionType
  | SettingsActionType
  | CommonActionType;
