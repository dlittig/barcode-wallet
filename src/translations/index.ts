import { de_DE } from "./de-DE";
import { en_US } from "./en-US";

export const getResources = (): Record<string, unknown> => ({
  ...de_DE,
  ...en_US,
})

export default {
  "de-DE": de_DE,
  "en-US": en_US,
};
