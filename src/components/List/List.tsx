import React, { FC } from "react";
import { ScrollView, View } from "react-native";
import BaseLayout from "../BaseLayout";

import style from "./List.style";

const List: FC<ListComponentType> = ({
  level = "2",
  children,
  spacer,
  middle,
  padding,
}) => (
  <BaseLayout level={level}>
    <ScrollView
      style={[style.container, padding && style.padding]}
      contentContainerStyle={middle === true && style.middle}
    >
      {children}
      {spacer ? (
        <View style={style.spacer} />
      ) : (
        <View style={style.miniSpacer} />
      )}
    </ScrollView>
  </BaseLayout>
);

export default List;
