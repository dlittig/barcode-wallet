import { CARD_COLOR } from "../../components/Card/Card";

export enum BARCODE_TYPE {
  QR = "QR",
  EAN13 = "EAN13",
  EAN8 = "EAN8",
  CODE128 = "CODE128",
}

export const BARCODE_TYPE_ENUMERABLE = {
  QR: "QR",
  EAN13: "EAN13",
  EAN8: "EAN8",
  CODE128: "CODE128",
};

export type Barcode = {
  id: string;
  name: string;
  description: string;
  color: CARD_COLOR;
  type: BARCODE_TYPE;
  time: number;
  code: string;
  expires: boolean;
  expiryDate: number;
  [k: string]: unknown;
};

export type BarcodeState = {
  barcodes: {
    byId: {
      [x: string]: Barcode;
    };
    allIds: Array<Barcode["id"]>;
  };
  sortedBarcodes: string[];
};

export type SettingsState = {
  theme: string;
  introSeen: boolean;
  locationPermission: boolean;
  locationPermissionAskAgain: boolean;
  imagePermission: boolean;
  imagePermissionAskAgain: boolean;
  notificationPermission: boolean;
  notificationPermissionAskAgain: boolean;
};
