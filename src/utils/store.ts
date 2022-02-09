import { Parking } from "../store/types";

export const take = <T extends unknown>(
  suspect: Parking,
  key: string,
  fallback: T
): T =>
  typeof suspect !== "undefined" &&
  suspect !== null &&
  typeof suspect[key] !== "undefined"
    ? (suspect[key] as T)
    : fallback;

export const searchFilter = (value: Parking, state: string) => {
  if (state.length === 0) return true;

  return (
    value.notes.toLowerCase().includes(state.toLowerCase()) ||
    value.name.toLowerCase().includes(state.toLowerCase())
  );
};

export const isValidParkingForm = (parking: any) =>
  parking.name.length > 0 && parking.location;
