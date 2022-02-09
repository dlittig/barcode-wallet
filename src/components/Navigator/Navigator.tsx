import React, { FC } from "react";

import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { withStyles } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";

import {
  APP_HOME,
  APP_SETTINGS,
} from "./Routes";
import Home from "../../screens/Home";
import Settings from "../../screens/Settings";
import { NavigatorComponentType } from "./types";
import Navigation from "../../services/navigation";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
  transitionSpec: {
    open: TransitionSpecs.FadeInFromBottomAndroidSpec,
    close: TransitionSpecs.FadeOutToBottomAndroidSpec,
  },
};

const Navigator: FC<NavigatorComponentType> = ({ eva }) => {
  const { t } = useTranslation();

  return (
    <View style={[{ flex: 1 }, eva?.style.container]}>
      <NavigationContainer
        ref={(navigationRef) => {
          navigationRef && Navigation.setNavigator(navigationRef);
        }}
      >
        <Stack.Navigator initialRouteName={t(APP_HOME)}>
          <Stack.Screen name={t(APP_HOME)} options={options} component={Home} />
          <Stack.Screen
            name={t(APP_SETTINGS)}
            options={options}
            component={Settings}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default withStyles(Navigator, (theme) => ({
  container: {
    backgroundColor: theme["background-basic-color-3"],
  },
}));
