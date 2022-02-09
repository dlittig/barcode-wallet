import React, { FC } from "react";
import { Layout } from "@ui-kitten/components";
import { BaseLayoutComponentType } from "./types";

import BaseLayoutStyle from "./BaseLayout.style";

const BaseLayout: FC<BaseLayoutComponentType> = ({
  level,
  children,
  center,
  padded,
}) => (
  <Layout
    style={[
      BaseLayoutStyle.container,
      center && BaseLayoutStyle.center,
      padded && BaseLayoutStyle.padded,
    ]}
    level={level}
  >
    {children}
  </Layout>
);

export default BaseLayout;
