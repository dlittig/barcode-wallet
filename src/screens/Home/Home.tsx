import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Modal,
  Text,
  Card as UIKittenCard,
} from "@ui-kitten/components";
import { useFonts } from "expo-font";
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Barcode from "../../components/Barcode";

import Card from "../../components/Card/Card";
import Icons from "../../components/Icons";
import List from "../../components/List";
import MainAction from "../../components/MainAction";
import TopBar from "../../components/Navigator/Bars/TopBar";
import { APP_BARCODE_EDIT } from "../../components/Navigator/Routes";
import Qrcode from "../../components/Qrcode";
import { RootReducerType } from "../../store/reducers";
import {
  barcodesAllSortedUnusedAndValidSelector,
  barcodesAllSortedUsedOrExpiredSelector,
  barcodesByIdSelector,
} from "../../store/selectors";
import { BARCODE_TYPE } from "../../store/types";
import { humanReadableDate, humanReadableTime } from "../../utils";
import * as Brightness from "expo-brightness";
import style from "./Home.style";
import { updateBarcode } from "../../store/actions/barcodeActions";

type ModalContentComponentType = {
  id: string;
  onClose: () => void;
};

const modalStyle = StyleSheet.create({
  header: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: -20,
    marginTop: -10,
  },
  timeInfo: {
    marginVertical: 10,
  },
});

const ModalContent: FC<ModalContentComponentType> = ({ id, onClose }) => {
  const barcode = useSelector((state: RootReducerType) =>
    barcodesByIdSelector(state, id)
  );
  const brightness = useRef<number | undefined>();

  useLayoutEffect(() => {
    (async () => {
      const currentBrightness = await Brightness.getBrightnessAsync();
      brightness.current = currentBrightness;
      console.log(brightness.current);
      Brightness.setBrightnessAsync(1);
    })();

    return () => {
      console.log(brightness.current);
      brightness.current && Brightness.setBrightnessAsync(brightness.current);
    };
  }, []);

  return (
    <>
      {id.length > 0 && (
        <UIKittenCard disabled={true} status={barcode.color}>
          <View>
            <View style={modalStyle.header}>
              <Button
                appearance="ghost"
                status="basic"
                accessoryLeft={Icons.Close}
                onPress={onClose}
              />
            </View>
            <Text category="h5">{barcode.name}</Text>
            <Text category="h6">{barcode.description}</Text>
            <View style={modalStyle.timeInfo}>
              <Text>Added on:</Text>
              <Text>{`${humanReadableDate(barcode.time)} ${humanReadableTime(
                barcode.time
              )}`}</Text>
            </View>
            {barcode.expires && (
              <View style={modalStyle.timeInfo}>
                <Text>Expires on:</Text>
                <Text>{`${humanReadableDate(barcode.expiryDate)}`}</Text>
              </View>
            )}

            {/* Just a box to give the modal a certain width */}
            <View
              style={{ width: Dimensions.get("window").width * 0.6 }}
            ></View>

            {/* <Skeleton isLoading={isLoading}></Skeleton> */}
            {barcode.type !== BARCODE_TYPE.QR ? (
              <Barcode
                value={barcode.code}
                options={{ format: barcode.type }}
              />
            ) : (
              <Qrcode value={barcode.code} />
            )}
          </View>
        </UIKittenCard>
      )}
    </>
  );
};

const Home: FC = () => {
  const [loaded] = useFonts({
    "Lobster-Regular": require("../../fonts/Lobster-Regular.ttf"),
  });
  const validBarcodes = useSelector(barcodesAllSortedUnusedAndValidSelector);
  const invalidBarcodes = useSelector(barcodesAllSortedUsedOrExpiredSelector);
  const [id, setId] = useState<string>("");
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onClose = () => setId("");

  return (
    <>
      {loaded ? (
        <>
          <TopBar />
          <List level="2" spacer>
            {validBarcodes.map((barcode, index) => (
              <Card
                key={`barcode-card-${index}`}
                id={barcode.id}
                name={barcode.name}
                isUsed={barcode.used}
                color={barcode.color}
                description={barcode.description}
                onEdit={() =>
                  navigation.navigate(
                    t(APP_BARCODE_EDIT) as never,
                    { id: barcode.id } as never
                  )
                }
                onOpen={() => setId(barcode.id)}
                onUsed={() =>
                  dispatch(
                    updateBarcode({
                      ...barcode,
                      used: true,
                    })
                  )
                }
              />
            ))}

            {invalidBarcodes.length > 0 && (
              <View style={style.divider}>
                <Text category="c1" appearance="hint" style={style.dividerText}>
                  Used or expired
                </Text>
              </View>
            )}

            {invalidBarcodes.map((barcode, index) => (
              <Card
                key={`barcode-card-${index}`}
                id={barcode.id}
                name={barcode.name}
                isUsed={barcode.used}
                color={barcode.color}
                description={barcode.description}
                onEdit={() =>
                  navigation.navigate(
                    t(APP_BARCODE_EDIT) as never,
                    { id: barcode.id } as never
                  )
                }
                onOpen={() => setId(barcode.id)}
                onUsed={() =>
                  dispatch(
                    updateBarcode({
                      ...barcode,
                      used: false,
                    })
                  )
                }
              />
            ))}
          </List>

          <Modal
            visible={id.length > 0}
            backdropStyle={style.modalBackdrop}
            onBackdropPress={onClose}
          >
            <ModalContent id={id} onClose={onClose} />
          </Modal>
          <MainAction>
            <Button
              accessoryLeft={Icons.Add}
              onPress={() => navigation.navigate(t(APP_BARCODE_EDIT) as never)}
            >
              {t("actions.createNew").toUpperCase()}
            </Button>
          </MainAction>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
