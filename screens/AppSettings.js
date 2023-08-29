import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DropDownPicker from 'react-native-dropdown-picker';

import { toggleTheme } from "../src/actions/themeSlice";
import { updateOrder } from "../src/actions/sorterSlice";

import Title from "../components/UI/Title";
import Button from "../components/UI/Button";

import DisplayCol from "../util/DisplayColor";

function Settings() {
  const theme = useSelector((state) => state.theme);
  const sorter = useSelector((state) => state.sorter);
  const [mode, setMode] = useState(theme.mode);
  const [order, setOrder] = useState(sorter.order);
  const [display, setDisplay] = useState(mode);
  const [selectedOrder, setSelectedOrder] = useState(order);
  const dispatch = useDispatch();

  const [changeSort, setChangeSort] = useState(false);
  const [changeDisplay, setChangeDisplay] = useState(false);

  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([
    {label: 'ALPHABETICAL', value: 'alphabetical'},
    {label: 'ALPHABETICAL(DESC)', value: 'reverseAlphabetical'},
    {label: 'PLAYTIME', value: 'playtime'},
    {label: 'MOST RECENT', value: 'lastplayed'},
    {label: 'LEAST RECENT', value: 'firstplayed'},
    {label: 'APP ID', value: 'appid'}
  ])

  useEffect(() => {
    setMode(theme.mode);
    setOrder(sorter.order)
  }, [theme, sorter])

  function changeDisplaySetting() {
    display === 'dark' ? setDisplay('light') : setDisplay('dark');
    setChangeDisplay(!changeDisplay)
  }

  function changeSortSetting(value) {
    console.log(`order: ${order} || value: ${value}\noString? ${typeof order === 'string'}\nvString? ${typeof value === 'string'}`)
    order !== value ? setChangeSort(true) : setChangeSort(false)
  }

  function applyChanges() {
    if(changeDisplay) {
      dispatch(toggleTheme())
      setChangeDisplay(false)
    }
    if(changeSort) {
      dispatch(updateOrder(selectedOrder))
      setChangeSort(false)
    }
  }

  return (
    <View style={[styles.settingsRoot, {backgroundColor: DisplayCol('background', mode)}]}>
      <Title>Display Mode</Title>
      <Button onPress={changeDisplaySetting} type={changeDisplay && 'edit'} style={{overflow: 'hidden'}}>{display}</Button>
      <Title>Sort Order Default</Title>
      <View style={{}}>
        <DropDownPicker 
          placeholder={selectedOrder ? selectedOrder : "SELECT AN ITEM"}
          open={open}
          value={selectedOrder}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedOrder}
          setItems={setItems}
          onChangeValue={changeSortSetting}
          style={[styles.picker, changeSort ? {
            backgroundColor: DisplayCol('error500', mode),
            borderColor: DisplayCol('error100', mode)
          } : {
            backgroundColor: DisplayCol('primary300', mode), 
            borderColor: DisplayCol('primary900', mode)
          }]}
          labelProps={{
            style : [styles.pickerLabel, {color: DisplayCol('text', mode)}]
          }}
          dropDownContainerStyle={[styles.pickContainer, {
            backgroundColor: DisplayCol('primary100', mode),
            borderColor: DisplayCol('primary900', mode)
          }]}
          textStyle={[styles.pickText, {color: DisplayCol('text', mode)}]}
          arrowIconStyle={{tintColor: DisplayCol('text', mode)}}
          tickIconStyle={{tintColor: DisplayCol('accent', mode)}}
          closeOnBackPressed={true}
          maxHeight={500}
        />
      </View>
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
  },
  picker: {
    borderWidth: 1,
    padding: 0,
  },
  pickContainer: {
    borderTopWidth: 0,
    margin: 0,
    padding: 0,
  },
  pickText: {
    flex: 1,
    margin: 0,
    fontFamily: 'Barlow',
    textAlign: 'justify',
  },
  pickerLabel: {
    flex: 1,
    fontFamily: 'Barlow',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase'
  }
})