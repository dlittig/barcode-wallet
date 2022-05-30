import React, { Dispatch } from "react";

import { useDispatch, useSelector } from "react-redux";
import { TFunction, useTranslation } from "react-i18next";
import { Button, Divider, List, ListItem } from "@ui-kitten/components";

import { requestImagePickerPermission, showToast } from "../../utils";
import pack from "../../../package.json";
import { SettingsEntryType } from "./types";
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import BackBar from "../../components/Navigator/Bars/BackBar/BackBar";
import { resetState } from "../../store/actions/commonActions";
import { barcodesSelector } from "../../store/selectors";
import { createBackup, readBackup } from "../../utils/backup";
import { Alert } from "react-native";
import { readFromBackup } from "../../store/actions/barcodeActions";

const renderItem =
  (dispatch: Dispatch<any>) =>
  ({ item, index }: { item: SettingsEntryType; index: number }) =>
    (
      <ListItem
        title={item.title}
        description={item.description}
        accessoryRight={() =>
          item.button ? (
            <Button
              size="small"
              appearance="outline"
              onPress={item.button.onPress(dispatch)}
            >
              {item.button.label}
            </Button>
          ) : (
            <></>
          )
        }
      />
    );

const confirmOverwrite = (t: TFunction<"translate", undefined>, dispatch: Dispatch<any>) =>
  Alert.alert(
    "Warning",
    "When you import data from a backup, all currently saved data will be overriden!",
    [
      {
        text: "Cancel",
        onPress: () => undefined,
        style: "cancel",
      },
      {
        text: "Accept",
        onPress: async () => {
          const backup = await readBackup();
          if (backup) {
            dispatch(readFromBackup(backup.payload));
            showToast(`Backup successfully read`);
          } else {
            showToast(`Failed to read backup`);
          }
        },
      },
    ],
    { cancelable: false }
  );

const Settings = () => {
  const barcodesData = useSelector(barcodesSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const settingsEntries: SettingsEntryType[] = [
    {
      title: t("text.settings.about.title"),
      description: t("text.settings.about.description"),
      button: {
        onPress: () => () => {
          showToast(`Version: v${pack.version}`);
        },
        label: t("actions.version"),
      },
    },
    {
      title: t("text.settings.mediaPermission.title"),
      description: t("text.settings.mediaPermission.description"),
      button: {
        onPress: () => () => {
          requestImagePickerPermission();
        },
        label: t("actions.grantPermission"),
      },
    },
    {
      title: "Import",
      description: "Import data from file system",
      button: {
        onPress: () => () => {
          confirmOverwrite(t, dispatch);
        },
        label: "Select file",
      },
    },
    {
      title: "Export",
      description: "Save your data to file",
      button: {
        onPress: () => () => {
          createBackup(barcodesData);
        },
        label: "Create",
      },
    },
  ];

  if (__DEV__) {
    settingsEntries.push({
      title: "[DEBUG] Reset",
      description: "Delete all state data",
      button: {
        onPress: (dispatch) => () => {
          dispatch(resetState());
        },
        label: t("actions.reset"),
      },
    });
  }

  return (
    <>
      <BackBar title={t("screens.settings")} />
      <BaseLayout level="1">
        <List
          data={settingsEntries}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem(dispatch)}
        />
      </BaseLayout>
    </>
  );
};

export default Settings;
