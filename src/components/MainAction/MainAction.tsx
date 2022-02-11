import React, { FC } from "react";
import { Layout } from "@ui-kitten/components";

import style from "./MainAction.style";
import { MainActionComponentType } from "./types";

const MainAction: FC<MainActionComponentType> = ({ children, border }) => (
  <Layout level="1" style={[style.container, border && style.border]}>
    {children}
  </Layout>
);

export default MainAction;
