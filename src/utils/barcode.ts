import JSBarcode from "jsbarcode";
import { BARCODE_TYPE } from "../store/types";

// Props to: https://snack.expo.dev/@wodin/better-barcode-generator
export const getEncodingHeight = (
  encoding: Record<string, any>,
  options: Record<string, any>
): number => {
  return (
    options.height +
    (options.displayValue && encoding.text.length > 0
      ? options.fontSize + options.textMargin
      : 0) +
    options.marginTop +
    options.marginBottom
  );
};

export const getBarcodePadding = (
  textWidth: number,
  barcodeWidth: number,
  options: Record<string, any>
): number => {
  if (options.displayValue && barcodeWidth < textWidth) {
    if (options.textAlign == "center") {
      return Math.floor((textWidth - barcodeWidth) / 2);
    } else if (options.textAlign == "left") {
      return 0;
    } else if (options.textAlign == "right") {
      return Math.floor(textWidth - barcodeWidth);
    }
  }
  return 0;
};

export const calculateEncodingAttributes = (
  encodings: Record<string, any>[],
  barcodeOptions: Record<string, any>,
  context?: Record<string, any>
) => {
  for (let i = 0; i < encodings.length; i++) {
    var encoding = encodings[i];
    var options = { ...barcodeOptions, ...encoding.options };

    // Calculate the width of the encoding
    var textWidth;
    if (options.displayValue) {
      textWidth = messureText(encoding.text, options, context);
    } else {
      textWidth = 0;
    }

    var barcodeWidth = encoding.data.length * options.width;
    encoding.width = Math.ceil(Math.max(textWidth, barcodeWidth));

    encoding.height = getEncodingHeight(encoding, options);

    encoding.barcodePadding = getBarcodePadding(
      textWidth,
      barcodeWidth,
      options
    );
  }

  return [...encodings];
};

export const getTotalWidthOfEncodings = (
  encodings: Record<string, any>[]
): number => {
  var totalWidth = 0;
  for (let i = 0; i < encodings.length; i++) {
    totalWidth += encodings[i].width;
  }
  return totalWidth;
};

export const getMaximumHeightOfEncodings = (
  encodings: Record<string, any>[]
): number => {
  var maxHeight = 0;
  for (let i = 0; i < encodings.length; i++) {
    if (encodings[i].height > maxHeight) {
      maxHeight = encodings[i].height;
    }
  }
  return maxHeight;
};

export const messureText = (
  string: string,
  options: Record<string, any>,
  context?: Record<string, any>
): number => {
  var ctx;

  if (context) {
    ctx = context;
  } else {
    // If the text cannot be messured we will return 0.
    // This will make some barcode with big text render incorrectly
    return 0;
  }
  ctx.font =
    options.fontOptions + " " + options.fontSize + "px " + options.font;

  // Calculate the width of the encoding
  var size = ctx.measureText(string).width;

  return size;
};

export const isValidBarcode = (
  barcode: string,
  type: keyof typeof BARCODE_TYPE
) => {
  try {
    if (type !== BARCODE_TYPE.QR && type !== BARCODE_TYPE.CODE128) {
      const result: Record<string, any> = {};
      JSBarcode(result, barcode, { format: type });
    } else {
      throw new Error("This code lacks validation");
    }
  } catch (e: any) {
    return false;
  }

  return true;
};
