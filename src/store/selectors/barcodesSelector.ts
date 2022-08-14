import createCachedSelector from "re-reselect";
import { RootReducerType } from "../reducers";
import { BarcodeState } from "../types";

export const barcodesSelector = (state: RootReducerType): BarcodeState =>
  state.barcodesReducer;

const barcodeId = (state: RootReducerType, id: string): string => id;

export const barcodesAllSelector = createCachedSelector(
  barcodesSelector,
  (barcodesReducer) =>
    barcodesReducer.barcodes.allIds.map(
      (id) => barcodesReducer.barcodes.byId[id]
    )
)((_state_) => "barcodes.allIds");

export const barcodesAllSortedSelector = createCachedSelector(
  barcodesSelector,
  (barcodesReducer) =>
    barcodesReducer.sortedBarcodes.map(
      (id) => barcodesReducer.barcodes.byId[id]
    )
)((_state_) => "barcodes.sortedBarcodes");

export const barcodesAllSortedUnusedAndValidSelector = createCachedSelector(
  barcodesAllSelector,
  (barcodes) =>
    barcodes.filter((barcode) => {
      if (barcode.used === false) {
        if (barcode.expires) {
          const now = Date.now();
          if (barcode.expiryDate > now) {
            return true;
          } else {
            return false;
          }
        }

        return true;
      }

      return false;
    })
)((_state_) => "barcodes.sortedUnusedOrValidBarcodes");

export const barcodesAllSortedUsedSelector = createCachedSelector(
  barcodesAllSelector,
  (barcodes) =>
    barcodes.filter((barcode) => {
      if (barcode.used === true) {
        return true;
      }

      return false;
    })
)((_state_) => "barcodes.sortedUsedBarcodes");

export const barcodesAllSortedExpiredSelector = createCachedSelector(
  barcodesAllSelector,
  (barcodes) =>
    barcodes.filter((barcode) => {
      if (barcode.used === false) {
        if (barcode.expires) {
          const now = Date.now();
          if (barcode.expiryDate <= now) {
            return true;
          } else {
            return false;
          }
        }
      }

      return false;
    })
)((_state_) => "barcodes.sortedExpiredBarcodes");

export const barcodesAllSortedUsedOrExpiredSelector = createCachedSelector(
  barcodesAllSelector,
  (barcodes) =>
    barcodes.filter((barcode) => {
      if (barcode.used === true) {
        return true;
      }

      if (barcode.expires) {
        const now = Date.now();
        if (barcode.expiryDate <= now) {
          return true;
        } else {
          return false;
        }
      }

      return false;
    })
)((_state_) => "barcodes.sortedUsedOrExpiredBarcodes");

export const barcodesByIdSelector = createCachedSelector(
  barcodesSelector,
  barcodeId,
  (barcodesReducer, id) => barcodesReducer.barcodes.byId[id]
)((_state_, id) => `barcodes.byId[${id}]`);
