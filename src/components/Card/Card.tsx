import React, { FC } from "react";
import { Animated, LayoutAnimation, View } from "react-native";
import { Card as UIKittenCard, Text } from "@ui-kitten/components";

import Footer from "./elements/Footer";
import { capitalize, useAnimation } from "../../utils";
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
}) => {
  const { animatedValue: zoomAnimatedValue, animate: animateZoom } =
    useAnimation();

  const scale = zoomAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  });

  const closeAnimation = (successCallback: () => void) => {
    animateZoom(1, 300).start(() => {
      LayoutAnimation.easeInEaseOut();
      successCallback();
      animateZoom(0, 300).start();
    });
  };

  return (
    <Animated.View
      style={{
        transform: [{ scaleY: scale }, { scaleX: scale }],
      }}
    >
      <UIKittenCard
        footer={() => (
          <Footer
            onOpen={onOpen}
            onEdit={onEdit}
            onUsed={() => {
              closeAnimation(onUsed);
            }}
            isUsed={isUsed}
          />
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
    </Animated.View>
  );
};

export const CARD_COLOR = {
  DARK_BLUE: "primary",
  GREEN: "success",
  LIGHT_BLUE: "info",
  YELLOW: "warning",
  RED: "danger",
  GREY: "basic",
};

export default React.memo(Card);
