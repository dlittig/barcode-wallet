import React, { FC } from "react";
import { View } from "react-native";
import { Card as UIKittenCard, Text } from "@ui-kitten/components";

import Footer from "./elements/Footer";
import { capitalize } from "../../utils";
import { CardComponentType } from "./types";

import style from "./Card.style";

const Card: FC<CardComponentType> = ({
  id,
  name,
  isUsed,
  description,
  color,
  onOpen,
  onEdit,
  onUsed,
  onDelete,
}) => (
  <UIKittenCard
    footer={() => (
      <Footer onOpen={onOpen} onEdit={onEdit} onUsed={onUsed} isUsed={isUsed} />
    )}
    onLongPress={onDelete}
    style={style.card}
    status={color}
  >
    <View style={style.header}>
      <Text category="h1" style={[style.textCenter, style.title]}>
        {capitalize(name)}
      </Text>
      <Text category="s1" style={style.textCenter}>
        {description}
      </Text>
    </View>
  </UIKittenCard>
);

export const CARD_COLOR = {
  DARK_BLUE: "primary",
  GREEN: "success",
  LIGHT_BLUE: "info",
  YELLOW: "warning",
  RED: "danger",
  GREY: "basic",
};

export default React.memo(Card);
