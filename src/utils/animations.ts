import React from "react";
import { Animated } from "react-native";

export const useAnimation = () => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const animate = (toValue: number, duration: number) =>
    Animated.timing(animatedValue, {
      toValue,
      duration,
      useNativeDriver: false,
    });

  return { animatedValue, animate };
};
