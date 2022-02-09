import React, { Dispatch } from "react";

import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Divider, List, ListItem } from "@ui-kitten/components";

import {
  requestImagePickerPermission,
  showToast,
} from "../../utils";
import pack from "../../../package.json";
import { SettingsEntryType } from "./types";
import { setSeenIntro } from "../../store/actions";
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import BackBar from "../../components/Navigator/Bars/BackBar/BackBar";
import { resetState } from "../../store/actions/commonActions";

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

const Settings = () => {
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
