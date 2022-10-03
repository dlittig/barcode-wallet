import {
  BARCODE_ADD,
  BARCODE_DELETE,
  BARCODE_UPDATE,
  BARCODE_READ_FROM_BACKUP,
  BARCODE_SET_FILTER_PHRASE,
  BARCODE_RESET_FILTER_PHRASE,
} from "../constants/barcodeConstants";
import { Barcode } from "../types";
import { ActionType } from "./types";
import { BackupPayload } from "../../utils/backup";

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

export const setFilterPhrase = (phrase: string): ActionType => ({
  type: BARCODE_SET_FILTER_PHRASE,
  phrase,
});

export const resetFilterPhrase = (): ActionType => ({
  type: BARCODE_RESET_FILTER_PHRASE,
});

export const readFromBackup = (backup: BackupPayload): ActionType => ({
  type: BARCODE_READ_FROM_BACKUP,
  payload: backup,
});
