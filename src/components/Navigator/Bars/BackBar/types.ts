import { ReactElement } from "react";

export type BackBarComponentType = {
  title: string;
  accessoryRight?: (x: any) => ReactElement;
};
