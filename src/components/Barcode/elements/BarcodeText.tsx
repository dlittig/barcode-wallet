import { FC } from "react";
import { Text, TextAnchor } from "react-native-svg";
import { BarcodeTextComponentType } from "./types";

const BarcodeText: FC<BarcodeTextComponentType> = ({
  text,
  width,
  padding,
  options,
}) => {
  // Draw the text if displayValue is set
  if (options.displayValue) {
    let x, y, textAnchor;

    if (options.textPosition == "top") {
      y = options.fontSize - options.textMargin;
    } else {
      y = options.height + options.textMargin + options.fontSize;
    }

    // Draw the text in the correct X depending on the textAlign option
    if (options.textAlign == "left" || padding > 0) {
      x = 0;
      textAnchor = "start";
    } else if (options.textAlign == "right") {
      x = width - 1;
      textAnchor = "end";
    }
    // In all other cases, center the text
    else {
      x = width / 2;
      textAnchor = "middle";
    }

    return (
      <Text
        x={x}
        y={y}
        fontFamily={options.font}
        fontSize={options.fontSize}
        fontWeight={"bold"}
        textAnchor={textAnchor as TextAnchor}
        fill={options.lineColor}
      >
        {text}
      </Text>
    );
  } else {
    return null;
  }
};

export default BarcodeText;
