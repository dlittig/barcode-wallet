import { Alert, ToastAndroid } from "react-native";
import { AnyAction, Dispatch } from "redux";
import { deleteBarcode, updateBarcode } from "../store/actions/barcodeActions";
import { Barcode, BARCODE_TYPE } from "../store/types";
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

export const confirmDeleteBarcode = (
  dispatch: Dispatch<AnyAction>,
  barcode: Barcode
) => {
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

export const confirmMarkCodeAsUsed = (
  dispatch: Dispatch<AnyAction>,
  barcode: Barcode
) => {
  const { t } = i18n;

  Alert.alert(
    t("dialogs.confirm_barcode_as_used.title"),
    `${t("dialogs.confirm_barcode_as_used.content")}`,
    [
      {
        text: t("actions.no"),
        onPress: () => undefined,
        style: "cancel",
      },
      {
        text: t("actions.accept"),
        onPress: () => {
          dispatch(
            updateBarcode({
              ...barcode,
              used: true,
            })
          );
        },
      },
    ],
    { cancelable: false }
  );
};

export const confirmReadFromClipboard = (
  codeType: keyof typeof BARCODE_TYPE,
  successCallback: () => void
) => {
  const { t } = i18n;

  Alert.alert(
    t("dialogs.confirm_paste_clipboard.title"),
    `${t("dialogs.confirm_paste_clipboard.content", { type: codeType })}`,
    [
      {
        text: t("actions.ignore"),
        onPress: () => undefined,
        style: "cancel",
      },
      {
        text: t("actions.accept"),
        onPress: () => {
          successCallback();
        },
      },
    ],
    { cancelable: false }
  );
};

export const confirmDuplicateBarcode = (successCallback: () => void) => {
  const { t } = i18n;

  Alert.alert(
    t("dialogs.confirm_duplicate_barcode.title"),
    `${t("dialogs.confirm_duplicate_barcode.content")}`,
    [
      {
        text: t("actions.no"),
        onPress: () => undefined,
        style: "cancel",
      },
      {
        text: t("actions.accept"),
        onPress: () => {
          successCallback();
        },
      },
    ],
    { cancelable: false }
  );
};
