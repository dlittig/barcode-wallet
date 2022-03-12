import { View } from "react-native";
import { Button } from "@ui-kitten/components";

import Icons from "../../../Icons";

import style from "./Footer.style";
import { FC } from "react";
import { FooterComponentType } from "./types";

const Footer: FC<FooterComponentType> = ({
  onOpen,
  onEdit,
  onUsed,
  isUsed,
}) => (
  <View style={style.footer}>
    <Button
      style={style.button}
      size="small"
      appearance="ghost"
      accessoryLeft={Icons.Edit}
      onPress={onEdit}
    >
      Edit
    </Button>

    {isUsed ? (
      <Button
        style={style.button}
        size="small"
        appearance="ghost"
        accessoryLeft={Icons.Launch}
        onPress={onUsed}
      >
        Unuse
      </Button>
    ) : (
      <Button
        style={style.button}
        size="small"
        appearance="ghost"
        accessoryLeft={Icons.Done}
        onPress={onUsed}
      >
        Use
      </Button>
    )}

    <Button
      style={style.button}
      size="small"
      appearance="outline"
      accessoryLeft={Icons.Open}
      onPress={onOpen}
    >
      Show
    </Button>
  </View>
);
export default Footer;
