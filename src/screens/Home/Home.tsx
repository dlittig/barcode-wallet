import { Text } from "@ui-kitten/components";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import Barcode from "../../components/Barcode";

import BaseLayout from "../../components/BaseLayout";
import TopBar from "../../components/Navigator/Bars/TopBar";

const Home: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <TopBar />
      <BaseLayout level="1">
        <Text>Home</Text>
        <Barcode
          value="9501101530003"
          options={{ format: "EAN13" }}
          rotation={0}
        />
      </BaseLayout>
    </>
  );
};

export default Home;
