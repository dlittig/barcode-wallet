import { useNavigation } from "@react-navigation/native";
import {
  Button,
  ButtonGroup,
  IndexPath,
  Input,
  Select,
  SelectItem,
  Text,
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
import {
  Barcode,
  BARCODE_TYPE,
  BARCODE_TYPE_ENUMERABLE,
} from "../../../store/types";
import { take } from "../../../utils";
import * as RNImagePicker from "expo-image-picker";
import { BarCodeScanner } from "expo-barcode-scanner";

import { v4 as uuidv4 } from "uuid";
import {
  addBarcode,
  updateBarcode,
} from "../../../store/actions/barcodeActions";
import { View } from "react-native";

import style from "./EditBarcode.style";

enum INPUT_TYPE {
  TEXT = "INPUT_TYPE_TEXT",
  FILE = "INPUT_TYPE_FILE",
  CAMERA = "INPUT_TYPE_CAMERA",
}

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
  const [selectedCodeTypeIndex, setCodeTypeSelectedIndex] = useState<
    IndexPath | IndexPath[]
  >(new IndexPath(0));
  const [codeType, setCodeType] = useState(
    take(barcode, "type", BARCODE_TYPE.EAN13)
  );
  const [inputType, setInputType] = useState<INPUT_TYPE>(INPUT_TYPE.TEXT);
  const navigation = useNavigation();

  const onSave = () => {
    const barcodeObject: Barcode = {
      id: take(barcode, "id", uuidv4()),
      name,
      description,
      color,
      code,
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
            imagePickerResult.uri
          );

          if (barcodeScannerResult.length === 1) {
            const code = barcodeScannerResult[0];
            setCode(code.data);
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
          <Input
            label={t("text.location.name") as string}
            value={name}
            onChangeText={(nextValue) => setName(nextValue)}
          />
          <Input
            label={"Description"}
            value={description}
            onChangeText={(nextValue) => setDescription(nextValue)}
          />

          <Text category="s2" appearance="hint">
            Code
          </Text>
          <View style={style.inputTypeGroup}>
            <Button
              onPress={() => setInputType(INPUT_TYPE.TEXT)}
              appearance={inputType === INPUT_TYPE.TEXT ? "filled" : "outline"}
            >
              Text
            </Button>
            <Button
              style={style.middleButton}
              onPress={() => setInputType(INPUT_TYPE.FILE)}
              appearance={inputType === INPUT_TYPE.FILE ? "filled" : "outline"}
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
            <Button
              accessoryLeft={<Icons.Open />}
              onPress={() => retrieveFromFile()}
            >
              <Text>Pick file from gallery</Text>
            </Button>
          )}

          {inputType === INPUT_TYPE.CAMERA && (
            <Button accessoryLeft={<Icons.Camera />}>
              <Text>Take photo</Text>
            </Button>
          )}

          <Select
            selectedIndex={selectedCodeTypeIndex}
            onSelect={(index: IndexPath | IndexPath[]) => {
              setCodeTypeSelectedIndex(index);
              Object.values(BARCODE_TYPE_ENUMERABLE)[1];
            }}
          >
            {Object.values(BARCODE_TYPE_ENUMERABLE).map((type, key) => (
              <SelectItem
                title={type}
                key={`select-item-barcode-type-${key}`}
              />
            ))}
          </Select>
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