import { FC } from "react";
import { View } from "react-native";
import { Button } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

import Icons from "../../../Icons";
import { FooterComponentType } from "./types";

import style from "./Footer.style";

const Footer: FC<FooterComponentType> = ({
  onOpen,
  onEdit,
  onUsed,
  isUsed,
}) => {
  const {t} = useTranslation();

  return (
    <View style={style.footer}>
      <Button
        style={style.button}
        size="small"
        appearance="ghost"
        accessoryLeft={Icons.Edit}
        onPress={onEdit}
      >
        {t("actions.edit")}
      </Button>

      {isUsed ? (
        <Button
          style={style.button}
          size="small"
          appearance="ghost"
          accessoryLeft={Icons.Launch}
          onPress={onUsed}
        >
          {t("actions.unuse")}
        </Button>
      ) : (
        <Button
          style={style.button}
          size="small"
          appearance="ghost"
          accessoryLeft={Icons.Done}
          onPress={onUsed}
        >
          {t("actions.use")}
        </Button>
      )}

      <Button
        style={style.button}
        size="small"
        appearance="outline"
        accessoryLeft={Icons.Open}
        onPress={onOpen}
      >
        {t("actions.show")}
      </Button>
    </View>
  );
};
export default Footer;
