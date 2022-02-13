import { FC } from "react";
import QRCode from "react-native-qrcode-svg";
import { QrcodeComponentType } from "./types";

const Qrcode: FC<QrcodeComponentType> = ({ value }) => (
  <QRCode value={value} size={50} />
);

export default Qrcode;
