import {
  COMMON_RESET_STATE,
} from "../constants/commonConstants";

import { ActionType } from "./types";

export const resetState = (): ActionType => ({
  type: COMMON_RESET_STATE,
});
