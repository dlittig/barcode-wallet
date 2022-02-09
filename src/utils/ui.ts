import { ToastAndroid } from "react-native";

export const showToast = (text: string) => {
  ToastAndroid.showWithGravityAndOffset(
    text,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    0,
    100
  );
};
