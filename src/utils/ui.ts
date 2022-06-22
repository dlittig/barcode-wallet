import { Alert, ToastAndroid } from "react-native";
import { AnyAction, Dispatch } from "redux";
import { deleteBarcode } from "../store/actions/barcodeActions";
import { Barcode } from "../store/types";
import i18n from "../translations/i18n";

export const showToast = (text: string) => {
  ToastAndroid.showWithGravityAndOffset(
    text,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    0,
    100
  );
};


export const confirmDeleteBarcode = (dispatch: Dispatch<AnyAction>, barcode: Barcode) => {
  const { t } = i18n;

  Alert.alert(
    t("dialogs.delete_barcode.title"),
    `${t("dialogs.delete_barcode.content")} "${barcode.name}"?`,
    [
      {
        text: t("actions.cancel"),
        onPress: () => undefined,
        style: "cancel",
      },
      {
        text: t("actions.accept"),
        onPress: () => {
          dispatch(deleteBarcode(barcode));
        },
      },
    ],
    { cancelable: false }
  );
};