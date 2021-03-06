import { FC } from "react";
import { Dimensions, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { QrcodeComponentType } from "./types";

import style from "./Qrcode.style";

const Qrcode: FC<QrcodeComponentType> = ({ value, style: styleProp }) => (
  <View style={[style.container, styleProp]}>
    <QRCode value={value} size={Dimensions.get("window").width * 0.6} />
  </View>
);

export default Qrcode;
