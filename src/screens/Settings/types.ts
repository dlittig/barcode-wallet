import { Dispatch } from "react";

export type SettingsEntryType = {
  title: string;
  description: string;
  button?: {
    onPress: (dispatch: Dispatch<any>) => () => void;
    label: string;
  };
};
