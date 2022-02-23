import { Button } from "@ui-kitten/components";
import { FC, useState } from "react";
import { Dimensions, View } from "react-native";
import { CARD_COLOR } from "../Card/Card";
import Icons from "../Icons";
import { ColorpickerComponentType } from "./types";

const Colorpicker: FC<ColorpickerComponentType> = ({ value, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState(value);

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1,
      }}
    >
      {Object.values(CARD_COLOR).map((color, index) => (
        <Button
          style={{
            width: Dimensions.get("window").width * 0.2,
            marginRight: 10,
            marginVertical: 5,
            height: 40,
          }}
          key={`color-picker-${color}-${index}`}
          status={color}
          accessoryLeft={selectedValue === color ? <Icons.Save /> : <></>}
          onPress={() => {
            setSelectedValue(color);
            onSelect(color);
          }}
        ></Button>
      ))}
    </View>
  );
};

export default Colorpicker;
