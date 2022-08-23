import {
  Button,
  Datepicker,
  IndexPath,
  Input,
  Select,
  SelectItem,
  Text,
  Toggle,
} from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import * as RNImagePicker from "expo-image-picker";
import { hasStringAsync, getStringAsync } from "expo-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  BarCodeEvent,
  BarCodeScanner,
  BarCodeScannerResult,
} from "expo-barcode-scanner";

import {
  addBarcode,
  updateBarcode,
} from "../../../store/actions/barcodeActions";
import List from "../../../components/List";
import Icons from "../../../components/Icons";
import Fieldset from "../../../components/Fieldset";
import MainAction from "../../../components/MainAction";
import BaseLayout from "../../../components/BaseLayout";
import { RootReducerType } from "../../../store/reducers";
import Colorpicker from "../../../components/Colorpicker";
import { CARD_COLOR } from "../../../components/Card/Card";
import { Barcode, BARCODE_TYPE } from "../../../store/types";
import { barcodesByIdSelector } from "../../../store/selectors";
import { APP_BARCODE_SCAN } from "../../../components/Navigator/Routes";
import BackBar from "../../../components/Navigator/Bars/BackBar/BackBar";
import {
  confirmReadFromClipboard,
  isValidBarcode,
  requestImagePickerMediaPermission,
  showToast,
  take,
} from "../../../utils";

import style from "./EditBarcode.style";

enum INPUT_TYPE {
  TEXT = "INPUT_TYPE_TEXT",
  FILE = "INPUT_TYPE_FILE",
  CAMERA = "INPUT_TYPE_CAMERA",
}

const ALLOWED_CODES = [
  BarCodeScanner.Constants.BarCodeType.qr,
  BarCodeScanner.Constants.BarCodeType.ean8,
  BarCodeScanner.Constants.BarCodeType.ean13,
  BarCodeScanner.Constants.BarCodeType.code128,
];

const EditBarcode = ({ route }: { route: any }) => {
  const barcodeId = route.params ? (route.params["id"] as string) : "";
  const barcode = useSelector((state: RootReducerType) =>
    barcodesByIdSelector(state, barcodeId)
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [name, setName] = useState(take(barcode, "name", ""));
  const [code, setCode] = useState(take(barcode, "code", "9501101530003"));
  const [description, setDescription] = useState(
    take(barcode, "description", "")
  );
  const [color, setColor] = useState(
    take(barcode, "color", CARD_COLOR.LIGHT_BLUE)
  );
  const [expires, setExpires] = useState(take(barcode, "expires", false));
  const [expiryDate, setExpiryDate] = useState(
    new Date(take(barcode, "expiryDate", Date.now()))
  );
  const [selectedCodeTypeIndex, setCodeTypeSelectedIndex] = useState<
    IndexPath | IndexPath[]
  >(
    new IndexPath(
      Object.values(BARCODE_TYPE).indexOf(
        take(barcode, "type", BARCODE_TYPE.EAN13)
      )
    )
  );
  const [codeType, setCodeType] = useState<keyof typeof BARCODE_TYPE>(
    take(barcode, "type", BARCODE_TYPE.EAN13)
  );
  const [inputType, setInputType] = useState<string>(INPUT_TYPE.TEXT);
  const navigation = useNavigation();

  const requestCameraPermission = async (successCallback: () => void) => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();

    if (status !== "granted") {
      showToast(t("toasts.permissions.camera.notGranted"));
    } else {
      successCallback();
    }
  };

  const setCodeTypeFromExpoBarcodeScannerResult = (
    scannerResult: BarCodeScannerResult
  ) => {
    switch (scannerResult.type) {
      case BarCodeScanner.Constants.BarCodeType.qr:
        setCodeType(BARCODE_TYPE.QR);
        return;
      case BarCodeScanner.Constants.BarCodeType.ean8:
        setCodeType(BARCODE_TYPE.EAN8);
        return;
      case BarCodeScanner.Constants.BarCodeType.ean13:
        setCodeType(BARCODE_TYPE.EAN13);
        return;
      case BarCodeScanner.Constants.BarCodeType.code128:
        setCodeType(BARCODE_TYPE.CODE128);
        return;
      default:
        return;
    }
  };

  const onDetectCode = ({ type, data }: BarCodeEvent) => {
    if (ALLOWED_CODES.indexOf(type) > 0) {
      setCode(data);
      setCodeTypeFromExpoBarcodeScannerResult({ type, data });
    } else {
      showToast(t("toasts.messages.typeNotSupported", { type }));
    }
  };

  const onSave = () => {
    if (name.length === 0 || description.length === 0) {
      showToast(t("toasts.messages.barcodeValidationFailed"));
      return;
    }

    const barcodeObject: Barcode = {
      id: take(barcode, "id", uuidv4()),
      name,
      description,
      color,
      code,
      used: false,
      expires,
      expiryDate: expiryDate.getTime(),
      type: codeType,
      time: take(barcode, "time", Date.now()),
    };

    if (barcodeId.length > 0) {
      dispatch(updateBarcode(barcodeObject));
    } else {
      dispatch(addBarcode(barcodeObject));
    }

    navigation.goBack();
  };

  const retrieveFromFile = async () => {
    try {
      const granted = await requestImagePickerMediaPermission();
      if (granted) {
        const options: RNImagePicker.ImagePickerOptions = {
          allowsMultipleSelection: false,
          quality: 1,
          mediaTypes: RNImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
        };
        const imagePickerResult = await RNImagePicker.launchImageLibraryAsync(
          options
        );
        if (imagePickerResult && !imagePickerResult.cancelled) {
          const barcodeScannerResult = await BarCodeScanner.scanFromURLAsync(
            imagePickerResult.uri,
            ALLOWED_CODES
          );

          if (barcodeScannerResult.length === 1) {
            const code = barcodeScannerResult[0];
            if (ALLOWED_CODES.indexOf(code.type) > 0) {
              setCode(code.data);
              setCodeTypeFromExpoBarcodeScannerResult(code);
            } else {
              showToast(
                t("toasts.messages.typeNotSupported", { type: code.type })
              );
            }
          } else {
            showToast(t("toasts.messages.tooManybarcodes"));
          }
        }
      }
    } catch (error) {
      console.debug(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (await hasStringAsync()) {
        const clipboardText = await getStringAsync();

        // Try all barcode types
        const codeTypes = Object.values(BARCODE_TYPE);
        let foundType: keyof typeof BARCODE_TYPE | null = null;

        for (let i = 0; i < codeTypes.length; i++) {
          if (isValidBarcode(clipboardText, codeTypes[i])) {
            foundType = codeType;
            break;
          }
        }

        if (foundType !== null) {
          confirmReadFromClipboard(foundType, () => {
            setCode(clipboardText);
            setCodeType(foundType!!);
          });
        }
      }
    })();
  }, []);

  return (
    <>
      <BackBar title={route.name} />
      <BaseLayout level="2">
        <List level="1" spacer padding>
          <Fieldset>
            <Input
              label={t("text.editBarcode.name") as string}
              value={name}
              onChangeText={(nextValue) => setName(nextValue)}
            />
          </Fieldset>

          <Fieldset>
            <Input
              label={t("text.editBarcode.description") as string}
              value={description}
              onChangeText={(nextValue) => setDescription(nextValue)}
            />
          </Fieldset>

          <Fieldset>
            <Text category="c1" appearance="hint" style={style.label}>
              {t("text.editBarcode.expires") as string}
            </Text>
            <View style={style.expiryContainer}>
              <Datepicker
                style={{ flexGrow: 2 }}
                disabled={!expires}
                date={expiryDate}
                onSelect={(nextDate) => setExpiryDate(nextDate)}
                min={new Date()}
              />
              <Toggle
                checked={expires}
                onChange={setExpires}
                style={style.toggle}
              ></Toggle>
            </View>
          </Fieldset>

          <Fieldset>
            <Text category="c1" appearance="hint" style={style.label}>
              {t("text.editBarcode.color") as string}
            </Text>
            <Colorpicker value={color} onSelect={(color) => setColor(color)} />
          </Fieldset>

          <Fieldset>
            <Text category="c1" appearance="hint" style={style.label}>
              {t("text.editBarcode.code") as string}
            </Text>
            <View style={style.inputTypeGroup}>
              <Button
                onPress={() => setInputType(INPUT_TYPE.TEXT)}
                appearance={
                  inputType === INPUT_TYPE.TEXT ? "filled" : "outline"
                }
              >
                {t("text.editBarcode.text") as string}
              </Button>
              <Button
                style={style.middleButton}
                onPress={() => setInputType(INPUT_TYPE.FILE)}
                appearance={
                  inputType === INPUT_TYPE.FILE ? "filled" : "outline"
                }
              >
                {t("text.editBarcode.file") as string}
              </Button>
              <Button
                onPress={() => setInputType(INPUT_TYPE.CAMERA)}
                appearance={
                  inputType === INPUT_TYPE.CAMERA ? "filled" : "outline"
                }
              >
                {t("text.editBarcode.camera") as string}
              </Button>
            </View>

            {inputType === INPUT_TYPE.TEXT && (
              <Input
                label={t("text.editBarcode.enterCode")}
                value={code}
                onChangeText={(nextValue) => setCode(nextValue)}
              />
            )}

            {inputType === INPUT_TYPE.FILE && (
              <>
                <Input
                  label={t("text.editBarcode.codeFromFile")}
                  value={code}
                  disabled
                  showSoftInputOnFocus={false}
                />
                <Button
                  accessoryLeft={<Icons.Open />}
                  status="success"
                  onPress={() => retrieveFromFile()}
                >
                  <Text>{t("actions.pickFromGallery")}</Text>
                </Button>
              </>
            )}

            {inputType === INPUT_TYPE.CAMERA && (
              <>
                <Input
                  label={t("text.editBarcode.codeFromCamera")}
                  value={code}
                  disabled
                  showSoftInputOnFocus={false}
                />
                <Button
                  accessoryLeft={<Icons.Camera />}
                  status="success"
                  onPress={async () => {
                    await requestCameraPermission(() => {
                      navigation.navigate(
                        t(APP_BARCODE_SCAN) as never,
                        // TODO potentially dangerous. Dont pass functions as params
                        { onDetectCode } as never
                      );
                    });
                  }}
                >
                  <Text>{t("actions.takePhoto")}</Text>
                </Button>
              </>
            )}
          </Fieldset>

          <Fieldset>
            <Select
              label={t("text.editBarcode.type") as string}
              value={codeType}
              selectedIndex={selectedCodeTypeIndex}
              onSelect={(index: IndexPath | IndexPath[]) => {
                setCodeTypeSelectedIndex(index);
                if (!Array.isArray(index)) {
                  const type = Object.values(BARCODE_TYPE)[index.row];
                  setCodeType(type);
                }
              }}
            >
              {Object.values(BARCODE_TYPE).map((type, key) => (
                <SelectItem
                  title={type}
                  key={`select-item-barcode-type-${key}`}
                />
              ))}
            </Select>
          </Fieldset>
        </List>
        <MainAction border>
          <Button accessoryLeft={Icons.Save} onPress={onSave}>
            {t("actions.save").toUpperCase()}
          </Button>
        </MainAction>
      </BaseLayout>
    </>
  );
};

export default EditBarcode;
