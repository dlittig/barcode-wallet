export type BackgroundComponentType = {
  width: number;
  height: number;
  color: string;
};

export type BarcodeTextComponentType = {
  text: string;
  width: number;
  padding: number;
  options: Record<string, any>;
};

export type BarcodeChunkComponentType = {
  binary: string[];
  options: Record<string, any>;
  padding: number;
};
