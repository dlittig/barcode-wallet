import { CommonActions, NavigationContainerRef } from "@react-navigation/core";

type Navigator = NavigationContainerRef<{}>;

let _navigator: Navigator; // eslint-disable-line

const setNavigator = (navigator: Navigator) => {
  _navigator = navigator;
};

const reset = (routeName: string, params: Record<string, any> = {}) => {
  _navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params }],
    })
  );
};

const goBack = () => {
  _navigator.dispatch({
    ...CommonActions.goBack(),
  });
};

const navigate = (routeName: string, params: Record<string, any> = {}) => {
  _navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: params,
    })
  );
};

export default {
  setNavigator,
  navigate,
  reset,
  goBack,
};
