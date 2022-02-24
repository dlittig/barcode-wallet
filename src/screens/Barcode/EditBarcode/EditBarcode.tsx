import { useNavigation } from "@react-navigation/native";
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
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import BaseLayout from "../../../components/BaseLayout";
import { CARD_COLOR } from "../../../components/Card/Card";
import Icons from "../../../components/Icons";
import List from "../../../components/List";
import MainAction from "../../../components/MainAction";
import BackBar from "../../../components/Navigator/Bars/BackBar/BackBar";
import { RootReducerType } from "../../../store/reducers";
import { barcodesByIdSelector } from "../../../store/selectors";
import { Barcode, BARCODE_TYPE } from "../../../store/types";
import { take } from "../../../utils";
import * as RNImagePicker from "expo-image-picker";
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";

import { v4 as uuidv4 } from "uuid";
import {
  addBarcode,
  updateBarcode,
} from "../../../store/actions/barcodeActions";
import { View } from "react-native";

import style from "./EditBarcode.style";
import Fieldset from "../../../components/Fieldset";
import Colorpicker from "../../../components/Colorpicker";
import { APP_BARCODE_SCAN } from "../../../components/Navigator/Routes";

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
  const [codeType, setCodeType] = useState<string>(
    take(barcode, "type", BARCODE_TYPE.EAN13)
  );
  const [inputType, setInputType] = useState<string>(INPUT_TYPE.TEXT);
  const navigation = useNavigation();

  const requestCameraPermission = async (successCallback: () => void) => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();

    if (status !== "granted") {
      console.warn("Camera permission has not been granted");
    } else {
      successCallback();
    }
  };

  const onDetectCode = ({ type, data }: BarCodeEvent) => {
    console.log("Got code", type, data);
    if (ALLOWED_CODES.indexOf(type) > 0) {
      console.log("setting...");
      setCode(data);
    }
  };

  const onSave = () => {
    const barcodeObject: Barcode = {
      id: take(barcode, "id", uuidv4()),
      name,
      description,
      color,
      code,
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
      const { status } =
        await RNImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === "granted") {
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
            } else {
              console.warn(`Sorry, ${code.type} is not supported`);
            }
          } else {
            console.warn("Error, got too many items from barcodescanner.");
          }
        }
      }
    } catch (error) {
      console.debug(error);
    }
  };

  return (
    <>
      <BackBar title={route.name} />
      <BaseLayout level="2">
        <List level="1" spacer padding>
          <Fieldset>
            <Input
              label={t("text.location.name") as string}
              value={name}
              onChangeText={(nextValue) => setName(nextValue)}
            />
          </Fieldset>

          <Fieldset>
            <Input
              label={"Description"}
              value={description}
              onChangeText={(nextValue) => setDescription(nextValue)}
            />
          </Fieldset>

          <Fieldset>
            <Text category="c1" appearance="hint" style={style.label}>
              Expires
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
              Color
            </Text>
            <Colorpicker value={color} onSelect={(color) => setColor(color)} />
          </Fieldset>

          <Fieldset>
            <Text category="c1" appearance="hint" style={style.label}>
              Code
            </Text>
            <View style={style.inputTypeGroup}>
              <Button
                onPress={() => setInputType(INPUT_TYPE.TEXT)}
                appearance={
                  inputType === INPUT_TYPE.TEXT ? "filled" : "outline"
                }
              >
                Text
              </Button>
              <Button
                style={style.middleButton}
                onPress={() => setInputType(INPUT_TYPE.FILE)}
                appearance={
                  inputType === INPUT_TYPE.FILE ? "filled" : "outline"
                }
              >
                File
              </Button>
              <Button
                onPress={() => setInputType(INPUT_TYPE.CAMERA)}
                appearance={
                  inputType === INPUT_TYPE.CAMERA ? "filled" : "outline"
                }
              >
                Camera
              </Button>
            </View>

            {inputType === INPUT_TYPE.TEXT && (
              <Input
                label="Enter code"
                value={code}
                onChangeText={(nextValue) => setCode(nextValue)}
              />
            )}

            {inputType === INPUT_TYPE.FILE && (
              <>
                <Input
                  label="Code from file"
                  value={code}
                  disabled
                  showSoftInputOnFocus={false}
                />
                <Button
                  accessoryLeft={<Icons.Open />}
                  status="success"
                  onPress={() => retrieveFromFile()}
                >
                  <Text>Pick file from gallery</Text>
                </Button>
              </>
            )}

            {inputType === INPUT_TYPE.CAMERA && (
              <>
                <Input
                  label="Code from camera"
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
                  <Text>Take photo</Text>
                </Button>
              </>
            )}
          </Fieldset>

          <Fieldset>
            <Select
              label="Type"
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
