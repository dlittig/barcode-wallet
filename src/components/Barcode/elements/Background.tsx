import { FC } from "react";
import { Rect } from "react-native-svg";
import { BackgroundComponentType } from "./types";

const Background: FC<BackgroundComponentType> = ({ width, height, color }) => (
  <Rect x={0} y={0} width={width} height={height} fill={color} />
);

export default Background;
