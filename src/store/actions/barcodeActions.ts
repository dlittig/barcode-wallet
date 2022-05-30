import { BackupPayload } from "../../utils/backup";
import {
  BARCODE_ADD,
  BARCODE_DELETE,
  BARCODE_UPDATE,
  BARCODE_READ_FROM_BACKUP,
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

export const readFromBackup = (backup: BackupPayload): ActionType => ({
  type: BARCODE_READ_FROM_BACKUP,
  payload: backup,
});
