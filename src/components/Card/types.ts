import { CARD_COLOR } from "./Card";

export type CardComponentType = {
  id: string;
  color: CARD_COLOR;
  name: string;
  description: string;
  onOpen: () => void;
  onEdit: () => void;
};
