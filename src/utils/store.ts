import { Barcode } from "../store/types";

export const take = <T extends unknown>(
  suspect: Barcode,
  key: string,
  fallback: T
): T =>
  typeof suspect !== "undefined" &&
  suspect !== null &&
  typeof suspect[key] !== "undefined"
    ? (suspect[key] as T)
    : fallback;
