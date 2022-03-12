export type CardComponentType = {
  id: string;
  isUsed: boolean;
  color: string;
  name: string;
  description: string;
  onOpen: () => void;
  onEdit: () => void;
  onUsed: () => void;
};
