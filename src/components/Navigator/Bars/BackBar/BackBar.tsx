import React from "react";
import {
  TopNavigation as UIKTopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { BackBarComponentType } from "./types";
import Icons from "../../../Icons";

const BackAction = () => {
  const navigation = useNavigation();
  return (
    <TopNavigationAction
      icon={Icons.Back}
      onPress={() => navigation.canGoBack() && navigation.goBack()}
    />
  );
};

const BackBar: FC<BackBarComponentType> = ({ title, accessoryRight }) => (
  <UIKTopNavigation
    alignment="center"
    accessoryLeft={BackAction}
    title={title}
    accessoryRight={accessoryRight}
  />
);

export default BackBar;
