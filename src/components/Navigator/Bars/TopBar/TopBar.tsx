import React from "react";

import {
  TopNavigation as UIKTopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import Icons from "../../../Icons";
import { APP_SETTINGS } from "../../Routes";

const SettingsAction = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const onPress = () => navigation.navigate(t(APP_SETTINGS) as never);

  return <TopNavigationAction icon={Icons.Settings} onPress={onPress} />;
};

const TopBar = () => (
  <UIKTopNavigation
    alignment="center"
    accessoryRight={SettingsAction}
    title="BarcodeWallet"
  />
);

export default TopBar;
