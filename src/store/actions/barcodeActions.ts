import {
  BARCODE_ADD,
  BARCODE_DELETE,
  BARCODE_UPDATE,
} from "../constants/barcodeConstants";
import { Barcode } from "../types";
import { ActionType } from "./types";

export const addBarcode = (barcode: Barcode): ActionType => ({
  type: BARCODE_ADD,
  payload: barcode,
});

export const deleteBarcode = (barcode: Barcode): ActionType => ({
  type: BARCODE_DELETE,
  payload: barcode,
});

export const updateBarcode = (barcode: Barcode): ActionType => ({
  type: BARCODE_UPDATE,
  payload: barcode,
});
