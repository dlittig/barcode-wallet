import { FC } from "react";
import { Rect } from "react-native-svg";
import { BarcodeChunkComponentType } from "./types";

const BarcodeChunk: FC<BarcodeChunkComponentType> = ({
  binary,
  padding,
  options,
}) => {
  // Creates the barcode out of the encoded binary
  let yFrom;
  if (options.textPosition == "top") {
    yFrom = options.fontSize + options.textMargin;
  } else {
    yFrom = 0;
  }

  let barWidth = 0;
  let x = 0;
  let bars = [];
  for (var b = 0; b < binary.length; b++) {
    x = b * options.width + padding;

    if (binary[b] === "1") {
      barWidth++;
    } else if (barWidth > 0) {
      bars.push({
        x: x - options.width * barWidth,
        y: yFrom,
        width: options.width * barWidth,
        height: options.height,
      });
      barWidth = 0;
    }
  }

  // Last draw is needed since the barcode ends with 1
  if (barWidth > 0) {
    bars.push({
      x: x - options.width * (barWidth - 1),
      y: yFrom,
      width: options.width * barWidth,
      height: options.height,
    });
  }

  return (
    <>
      {bars.map((bar, i) => (
        <Rect
          key={i}
          x={bar.x}
          y={bar.y}
          width={bar.width}
          height={bar.height}
        />
      ))}
    </>
  );
};

export default BarcodeChunk;
