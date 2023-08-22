import { Pressable, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

import DisplayCol from "../../util/DisplayColor";


function SearchButton({ onSearch, style }){
  const theme = useSelector((state) => state.theme);
  const [mode, setMode] = useState(theme.mode)

  useEffect(() => {
    setMode(theme.mode);
  }, [theme])

  return(
    <View 
      style={
        [style, styles.iconContainer, {
          borderColor: DisplayCol('accent', mode),
        },
        ({hovered}) => hovered && {backgroundColor: DisplayCol('accent')}]}>
      <Pressable 
        onPress={onSearch}
        style={({pressed}) => pressed && styles.pressed}>
        <SimpleLineIcons name='magnifier' size={30} color={DisplayCol('primary100', mode)} />
      </Pressable>
    </View>
  )
}

export default SearchButton;

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    borderBottomWidth: 1,
  },
  buttonContainer: {
    flexGrow: 1,
  },
  pressed: {
    opacity: .75,
    backgroundColor: 'red',
  }
})