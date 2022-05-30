import { CommonActionType, BarcodeActionType } from "../actions/types";
import { COMMON_RESET_STATE } from "../constants/commonConstants";
import {
  BARCODE_ADD,
  BARCODE_DELETE,
  BARCODE_READ_FROM_BACKUP,
  BARCODE_UPDATE,
} from "../constants/barcodeConstants";
import { Barcode, BarcodeState } from "../types";

const initialState: BarcodeState = {
  barcodes: {
    byId: {},
    allIds: [],
  },
  sortedBarcodes: [],
};

export const barcodesReducer = (
  state = initialState,
  action: BarcodeActionType | CommonActionType
): BarcodeState => {
  let newState = {} as BarcodeState;
  let barcode: Barcode;

  switch (action.type) {
    case BARCODE_ADD:
      barcode = action.payload;
      newState = { ...state };
      // Add to overall list of parkings
      newState.barcodes.byId[barcode.id] = barcode;

      // Add to list and sort
      newState.barcodes.allIds.push(barcode.id);
      newState.sortedBarcodes.push(barcode.id);
      newState.sortedBarcodes.sort(
        (a, b) =>
          newState.barcodes.byId[b].time - newState.barcodes.byId[a].time
      );

      return newState;
    case BARCODE_UPDATE:
      barcode = action.payload;
      newState = { ...state };
      newState.barcodes.byId[barcode.id] = barcode;

      return newState;
    case BARCODE_DELETE:
      barcode = action.payload;
      newState = { ...state };

      newState.barcodes.allIds = newState.barcodes.allIds.filter(
        (item) => item !== barcode.id
      );
      newState.sortedBarcodes = newState.sortedBarcodes.filter(
        (item) => item !== barcode.id
      );
      delete newState.barcodes.byId[barcode.id];

      return newState;
    case BARCODE_READ_FROM_BACKUP:
      return action.payload;
    case COMMON_RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
