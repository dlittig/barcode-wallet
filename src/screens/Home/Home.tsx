import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Modal,
  Text,
  Card as UIKittenCard,
} from "@ui-kitten/components";
import { useFonts } from "expo-font";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import Barcode from "../../components/Barcode";

import BaseLayout from "../../components/BaseLayout";
import Card, { CARD_COLOR } from "../../components/Card/Card";
import Icons from "../../components/Icons";
import List from "../../components/List";
import MainAction from "../../components/MainAction";
import TopBar from "../../components/Navigator/Bars/TopBar";
import { APP_BARCODE_EDIT } from "../../components/Navigator/Routes";
import { RootReducerType } from "../../store/reducers";
import {
  barcodesAllSelector,
  barcodesByIdSelector,
} from "../../store/selectors";
import { humanReadableDate, humanReadableTime } from "../../utils";
import style from "./Home.style";

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
              <Text>Hinzugefügt am:</Text>
              <Text>{`${humanReadableDate(barcode.time)} ${humanReadableTime(
                barcode.time
              )}`}</Text>
            </View>
            <Barcode value={barcode.code} options={{ format: "EAN13" }} />
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
  const { t } = useTranslation();
  const barcodes = useSelector(barcodesAllSelector);
  const navigation = useNavigation();
  const [id, setId] = useState<string>("");

  const onClose = () => setId("");

  return (
    <>
      {loaded ? (
        <>
          <TopBar />
          <List level="2" spacer>
            {barcodes.map((barcode, index) => (
              <Card
                key={`barcode-card-${index}`}
                id={barcode.id}
                name={barcode.name}
                color={barcode.color}
                description={barcode.description}
                onOpen={() => setId(barcode.id)}
              />
            ))}
          </List>

          <Modal visible={id.length > 0} backdropStyle={style.modalBackdrop}>
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
