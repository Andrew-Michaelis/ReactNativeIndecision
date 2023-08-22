import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Button from "../components/UI/Button";
import { toggleTheme } from "../src/actions/themeSlice";

function Settings() {
  const displayMode = useSelector((state) => state.theme.mode)
  const dispatch = useDispatch();

  function changeDisplaySetting() {
    dispatch(toggleTheme())
  }

  return (
    <View>
      <Button onPress={changeDisplaySetting}>{displayMode}</Button>
      <Button>apply</Button>
    </View>
  );
}

export default Settings;