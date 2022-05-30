import { FC, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";

import BaseLayout from "../../../components/BaseLayout";
import BackBar from "../../../components/Navigator/Bars/BackBar";
import { ScanBarcodeComponentType, DetectCodeCallback } from "./types";
import { View } from "react-native";

const ScanBarcode: FC<ScanBarcodeComponentType> = ({ route }) => {
  const onDetectCode: DetectCodeCallback = route.params
    ? route.params["onDetectCode"]
    : () => {};
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  const onResult = (event: BarCodeEvent) => {
    setScanned(true);
    onDetectCode(event);
    navigation.goBack();
  };

  return (
    <>
      <BackBar title={route.name} />
      <View style={{ backgroundColor: "black", flex: 1 }}>
        <BarCodeScanner
          style={{ flexGrow: 1 }}
          onBarCodeScanned={scanned ? undefined : onResult}
        />
      </View>
    </>
  );
};

export default ScanBarcode;
