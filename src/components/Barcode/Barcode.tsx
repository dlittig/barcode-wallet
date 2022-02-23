import React, { FC, useEffect, useState } from "react";
import JSBarcode from "jsbarcode";
import { View } from "react-native";
import Svg, { G } from "react-native-svg";

import {
  calculateEncodingAttributes,
  getMaximumHeightOfEncodings,
  getTotalWidthOfEncodings,
} from "../../utils";
import { BarcodeComponentType } from "./types";
import Background from "./elements/Background";
import BarcodeText from "./elements/BarcodeText";
import BarcodeChunk from "./elements/BarcodeChunk";

import style from "./Barcode.style";

const defaults = {
  width: 2,
  height: 100,
  // format: "auto",
  displayValue: true,
  fontOptions: "bold",
  font: "monospace",
  text: "",
  textAlign: "center",
  textPosition: "bottom",
  textMargin: 2,
  fontSize: 20,
  background: "#ffffff",
  lineColor: "#000000",
  // margin: 10,
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 10,
  marginRight: 10,
  // valid: function(){}
};

const Barcode: FC<BarcodeComponentType> = ({
  value,
  options,
  style: styleProp,
}) => {
  const [ready, setReady] = useState(false);
  const [xCoordinates, setXCoordinates] = useState<number[]>([]);
  const [encodings, setEncodings] = useState<Record<string, any>[]>([]);
  const [mergedOptions, setMergedOptions] = useState<Record<string, any>>({});
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(
    () => {
      const barcode: Record<string, any> = {};
      JSBarcode(barcode, value, options);

      let encodings: Record<string, any>[] = barcode.encodings;
      const newOptions = { ...defaults, ...options };
      setMergedOptions(newOptions);

      encodings = calculateEncodingAttributes(encodings, newOptions);

      const totalWidth = getTotalWidthOfEncodings(encodings);
      setHeight(getMaximumHeightOfEncodings(encodings));
      setWidth(totalWidth + newOptions.marginLeft + newOptions.marginRight);

      const xs = [newOptions.marginLeft];
      encodings.forEach((e) => xs.push(xs[xs.length - 1] + e.width));
      setXCoordinates(xs);
      setEncodings(encodings);

      setReady(true);
    },
    [
      /* on mount */
    ]
  );

  return (
    <View style={[style.container, styleProp]}>
      {ready && (
        <Svg
          x={0}
          y={0}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          originX={0}
          originY={0}
        >
          {mergedOptions.background && (
            <Background
              width={width}
              height={height}
              color={mergedOptions.background}
            />
          )}
          {encodings.map((encoding, i) => {
            const encodingOptions = { ...options, ...encoding.options };

            return (
              <G
                key={i}
                x={xCoordinates[i]}
                y={encodingOptions.marginTop}
                fill={encodingOptions.lineColor}
              >
                <BarcodeChunk
                  binary={encoding.data}
                  padding={encoding.barcodePadding}
                  options={encodingOptions}
                />
                <BarcodeText
                  text={encoding.text}
                  width={encoding.width}
                  padding={encoding.barcodePadding}
                  options={encodingOptions}
                />
              </G>
            );
          })}
        </Svg>
      )}
    </View>
  );
};

export default React.memo(Barcode);
