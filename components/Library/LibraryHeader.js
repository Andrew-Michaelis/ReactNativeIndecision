import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import DisplayCol from "../../util/DisplayColor";
import SearchBar from "./HeaderFilter";
import UserIcon from "../UI/UserIcon";

function LibraryHeader({ onAvatarPress }) {
  const userName = useSelector((state) => state.user.name)
  const theme = useSelector((state) => state.theme);
  const [mode, setMode] = useState(theme.mode)

  useEffect(() => {
    setMode(theme.mode);
  }, [theme])

  return(
    <View style={[styles.headerContainer, {backgroundColor: DisplayCol('primary300', mode)}]}>
      <UserIcon onPress={onAvatarPress}/>
      <Text 
        adjustsFontSizeToFit
        style={[styles.headerText, {color: DisplayCol('text', mode),}]}
      >{userName}</Text>
      <SearchBar />
    </View>
  )
}

export default LibraryHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    minHeight: 50,
  },
  headerText: {
    flexShrink: 1,
    flexGrow: 1,
    flexWrap: 'wrap',
    marginHorizontal: 4,
    textAlign: 'left',
    fontSize: 24,
  },
})