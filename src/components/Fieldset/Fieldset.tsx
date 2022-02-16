import { FC } from "react";
import { View } from "react-native";

import style from "./Fieldset.style";

const Fieldset: FC = ({ children }) => (
  <View style={style.field}>{children}</View>
);

export default Fieldset;
