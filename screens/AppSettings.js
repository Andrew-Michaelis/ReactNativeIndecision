import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Picker } from '@react-native-picker/picker';

import { toggleTheme } from "../src/actions/themeSlice";
import { updateOrder } from "../src/actions/sorterSlice";

import Title from "../components/UI/Title";
import Button from "../components/UI/Button";

import DisplayCol from "../util/DisplayColor";

let changeDisplay = false;

function Settings() {
  const theme = useSelector((state) => state.theme);
  const sorter = useSelector((state) => state.sorter);
  const [mode, setMode] = useState(theme.mode);
  const [display, setDisplay] = useState(mode);
  const [order, setOrder] = useState(sorter.order)
  const [selectedOrder, setSelectedOrder] = useState(order);
  const dispatch = useDispatch();

  useEffect(() => {
    setMode(theme.mode);
    setOrder(sorter.order)
  }, [theme, sorter])

  function changeDisplaySetting() {
    display === 'dark' ? setDisplay('light') : setDisplay('dark');
    changeDisplay = !changeDisplay
  }

  function applyChanges() {
    if(changeDisplay) {
      dispatch(toggleTheme())
      changeDisplay = false;
    }
    if(changeOrder) {
      dispatch(updateOrder)
    }
  }

  return (
    <View style={[styles.settingsRoot, {backgroundColor: DisplayCol('background', mode)}]}>
      <Title>Display Mode</Title>
      <Button onPress={changeDisplaySetting} type={changeDisplay && 'edit'} style={{overflow: 'hidden'}}>{display}</Button>
      <Title>Sort Order Default</Title>
      <Picker 
        selectedValue={selectedOrder}
        onValueChange={(itemValue, itemIndex) => setSelectedOrder(itemValue)}
      >
        <Picker.Item labal="" value="" />
      </Picker>
      <Title>Apply Changes</Title>
      <Button onPress={applyChanges}>apply</Button>
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  settingsRoot: {
    flex: 1,
    paddingHorizontal: 50,
  }
})