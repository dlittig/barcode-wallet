import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Modal,
  Text,
  Card as UIKittenCard,
} from "@ui-kitten/components";
import { Lobster_400Regular, useFonts } from "@expo-google-fonts/lobster";
import React, { FC, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BackHandler, Dimensions, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Brightness from "expo-brightness";
import Barcode from "../../components/Barcode";

import List from "../../components/List";
import Card from "../../components/Card";
import Icons from "../../components/Icons";
import Qrcode from "../../components/Qrcode";
import MainAction from "../../components/MainAction";
import { RootReducerType } from "../../store/reducers";
import TopBar from "../../components/Navigator/Bars/TopBar";
import { APP_BARCODE_EDIT } from "../../components/Navigator/Routes";
import {
  barcodesAllSortedExpiredSelector,
  barcodesAllSortedUnusedAndValidSelector,
  barcodesAllSortedUsedOrExpiredSelector,
  barcodesAllSortedUsedSelector,
  barcodesByIdSelector,
} from "../../store/selectors";
import { Barcode as BarcodeType, BARCODE_TYPE } from "../../store/types";
import {
  confirmDeleteBarcode,
  confirmMarkCodeAsUsed,
  humanReadableDate,
  humanReadableTime,
  showToast,
} from "../../utils";
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
  const { t } = useTranslation();
  const barcode = useSelector((state: RootReducerType) =>
    barcodesByIdSelector(state, id)
  );
  const brightness = useRef<number | undefined>();

  useLayoutEffect(() => {
    const backpressHandler = () => {
      if (id.length > 0) {
        onClose();
        return true;
      }

      return false;
    };

    BackHandler.addEventListener("hardwareBackPress", backpressHandler);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backpressHandler);
  }, []);

  useLayoutEffect(() => {
    (async () => {
      const currentBrightness = await Brightness.getBrightnessAsync();
      brightness.current = currentBrightness;
      Brightness.setBrightnessAsync(1);
    })();

    return () => {
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
              <Text>{t("text.home.addedOn") as string}:</Text>
              <Text>{`${humanReadableDate(barcode.time)} ${humanReadableTime(
                barcode.time
              )}`}</Text>
            </View>
            {barcode.expires && (
              <View style={modalStyle.timeInfo}>
                <Text>{t("text.home.expiresOn") as string}:</Text>
                <Text>{`${humanReadableDate(barcode.expiryDate)}`}</Text>
              </View>
            )}
            {barcode.used && barcode.usageDate && (
              <View style={modalStyle.timeInfo}>
                <Text>{t("text.home.usageDate") as string}:</Text>
                <Text>{`${humanReadableDate(barcode.usageDate)}`}</Text>
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
    "Lobster-Regular": Lobster_400Regular,
  });
  const validBarcodes = useSelector(barcodesAllSortedUnusedAndValidSelector);
  const expiredBarcodes = useSelector(barcodesAllSortedExpiredSelector);
  const usedBarcodes = useSelector(barcodesAllSortedUsedSelector);
  const [currentBarcode, setCurrentBarcode] = useState<BarcodeType | null>(
    null
  );
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onClose = () => {
    if (currentBarcode !== null) {
      if (!currentBarcode.used) confirmMarkCodeAsUsed(dispatch, currentBarcode);
      setCurrentBarcode(null);
    }
  };

  return (
    <>
      {loaded ? (
        <>
          <TopBar />
          <List level="2" spacer>
            {validBarcodes.length === 0 &&
              usedBarcodes.length === 0 &&
              expiredBarcodes.length === 0 && (
                <View style={style.emptyContainer}>
                  <Text style={style.emptyText}>{t("empty.home")}</Text>
                </View>
              )}
            {validBarcodes.map((barcode, index) => (
              <Card
                key={`barcode-card-${index}`}
                id={barcode.id}
                name={barcode.name}
                isUsed={barcode.used}
                color={barcode.color}
                description={barcode.description}
                onDelete={() => confirmDeleteBarcode(dispatch, barcode)}
                onEdit={() =>
                  navigation.navigate(
                    t(APP_BARCODE_EDIT) as never,
                    { id: barcode.id } as never
                  )
                }
                onOpen={() => setCurrentBarcode(barcode)}
                onUsed={() => {
                  dispatch(
                    updateBarcode({
                      ...barcode,
                      used: true,
                      usageDate: Date.now(),
                    })
                  );
                  showToast(t("toasts.messages.codeUsed"));
                }}
              />
            ))}

            {usedBarcodes.length > 0 && (
              <View style={style.divider}>
                <Text category="c1" appearance="hint" style={style.dividerText}>
                  {t("text.home.used")}
                </Text>
              </View>
            )}

            {usedBarcodes.map((barcode, index) => (
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
                onOpen={() => setCurrentBarcode(barcode)}
                onDelete={() => confirmDeleteBarcode(dispatch, barcode)}
                onUsed={() => {
                  dispatch(
                    updateBarcode({
                      ...barcode,
                      used: false,
                      usageDate: undefined,
                    })
                  );
                  showToast(t("toasts.messages.codeRestored"));
                }}
              />
            ))}

            {expiredBarcodes.length > 0 && (
              <View style={style.divider}>
                <Text category="c1" appearance="hint" style={style.dividerText}>
                  {t("text.home.expired")}
                </Text>
              </View>
            )}

            {expiredBarcodes.map((barcode, index) => (
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
                onOpen={() => setCurrentBarcode(barcode)}
                onDelete={() => confirmDeleteBarcode(dispatch, barcode)}
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
            visible={currentBarcode !== null}
            backdropStyle={style.modalBackdrop}
            onBackdropPress={onClose}
          >
            <ModalContent id={currentBarcode?.id || ""} onClose={onClose} />
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
