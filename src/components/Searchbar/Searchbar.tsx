import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TouchableWithoutFeedback, View } from "react-native";
import { IconProps, Input, withStyles } from "@ui-kitten/components";

import {
  resetFilterPhrase,
  setFilterPhrase,
} from "../../store/actions/barcodeActions";
import Icons from "../Icons";
import { SearchbarComponentType } from "./types";
import { barcodesFilterPhraseSelector } from "../../store/selectors";

import style from "./Searchbar.style";

const Searchbar: FC<SearchbarComponentType> = ({ eva }) => {
  const dispatch = useDispatch();
  const search = useSelector(barcodesFilterPhraseSelector);

  const renderResetIcon = (props: IconProps) => (
    <>
      {search.length > 0 && (
        <TouchableWithoutFeedback onPress={() => dispatch(resetFilterPhrase())}>
          <Icons.Close {...props} />
        </TouchableWithoutFeedback>
      )}
    </>
  );

  return (
    <View style={[eva?.style.container, style.container]}>
      <Input
        placeholder="Search..."
        value={search}
        onChangeText={(text) => dispatch(setFilterPhrase(text))}
        accessoryRight={renderResetIcon}
      />
    </View>
  );
};
export default withStyles(Searchbar, (theme) => ({
  container: {
    backgroundColor: theme["background-basic-color-1"],
    borderBottomWidth: 2,
    borderBottomColor: theme["background-basic-color-3"],
  },
}));
