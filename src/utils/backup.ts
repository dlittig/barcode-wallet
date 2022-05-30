import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

import pack from "../../package.json";
import { backupTimestamp } from "./format";
import { BarcodeState } from "../store/types";

export type Backup = {
  date: number;
  version: string;
  payload: BackupPayload;
};

export type BackupPayload = BarcodeState;

const addMetaData = (data: BackupPayload): Backup => {
  return {
    date: Date.now(),
    version: pack.version,
    payload: data,
  };
};

const isValidBackup = (data: Record<string, any>): data is Backup => {
  return (
    (data as Backup).version !== null &&
    (data as Backup).date !== null &&
    (data as Backup).payload !== null &&
    (data as Backup).payload.sortedBarcodes !== null &&
    typeof (data as Backup).version === "string" &&
    typeof (data as Backup).date === "number"
  );
};

export const createBackup = async (data: BackupPayload) => {
  const filename = `barcode-wallet_${backupTimestamp(Date.now())}.backup`;
  const fileUri = `${FileSystem.documentDirectory}${filename}`;

  try {
    // Add metadata
    const serializedData = JSON.stringify(addMetaData(data));

    // Write to local filesystem
    await FileSystem.writeAsStringAsync(fileUri, serializedData, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    
    await Sharing.shareAsync(fileUri, { dialogTitle: "Save backup" });
  } catch (e) {
    console.warn(`Failed to create backup`, e, fileUri);
  }

  // Remove the local file now
  try {
    const info = await FileSystem.getInfoAsync(fileUri);
    if (info.exists) {
      await FileSystem.deleteAsync(fileUri);
    }
  } catch (e) {
    console.warn("Failed to delete local file");
  }
};

export const readBackup = async (): Promise<Backup | null> => {
  const fileUri = `${FileSystem.cacheDirectory}/import.backup`;
  const result = await DocumentPicker.getDocumentAsync({
    copyToCacheDirectory: false,
  });

  if (result.type !== "cancel") {
    try {
      await FileSystem.copyAsync({
        from: result.uri,
        to: fileUri,
      });

      const data = await FileSystem.readAsStringAsync(fileUri);
      const parsedObject = JSON.parse(data);

      if (isValidBackup(parsedObject)) {
        await FileSystem.deleteAsync(fileUri);
        return parsedObject;
      } else {
        await FileSystem.deleteAsync(fileUri);
        return null;
      }
    } catch (e) {
      console.warn("Could not import from file", e);
      return null;
    }
  }

  return null;
};
