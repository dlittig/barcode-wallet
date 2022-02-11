import { useNavigation } from "@react-navigation/native";
import {
  Button,
  IndexPath,
  Input,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import { useState } from "react";
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

import { v4 as uuidv4 } from "uuid";
import {
  addBarcode,
  updateBarcode,
} from "../../../store/actions/barcodeActions";

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
          <Input
            label="Code"
            value={code}
            onChangeText={(nextValue) => setCode(nextValue)}
          />
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
