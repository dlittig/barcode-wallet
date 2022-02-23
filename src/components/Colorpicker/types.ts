import { CARD_COLOR } from "../Card/Card";

export type ColorpickerComponentType = {
  onSelect: (color: CARD_COLOR) => void;
  value: CARD_COLOR;
};
