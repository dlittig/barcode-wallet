import { BarCodeEvent } from "expo-barcode-scanner";

export type ScanBarcodeComponentType = {
    route: any;
}

export type DetectCodeCallback = (data: BarCodeEvent) => void;