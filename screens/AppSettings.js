import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Button from "../components/UI/Button";
import { toggleDisplay } from "../src/actions/settingSlice";

function Settings() {
  const displayMode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  function changeDisplaySetting() {
  }

  return (
    <View>
      <Button onPress={changeDisplaySetting}>{displayMode}</Button>
      <Button>apply</Button>
    </View>
  );
}

export default Settings;