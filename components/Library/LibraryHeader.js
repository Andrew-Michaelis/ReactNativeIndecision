import { StyleSheet, Text, TextInput, View } from "react-native";

import DisplayCol from "../../util/DisplayColor";
import { useSelector } from "react-redux";
import LibraryFilter from "./LibraryFilter";
import UserIcon from "../UI/UserIcon";

function LibraryHeader({ onAvatarPress }) {
  const userName = useSelector((state) => state.user.name)

  return(
    <View style={styles.headerContainer}>
      <UserIcon onPress={onAvatarPress}/>
      <Text 
        adjustsFontSizeToFit
        style={styles.headerText}
      >{userName}</Text>
      <LibraryFilter />
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
    backgroundColor: DisplayCol('primary300'),
  },
  headerText: {
    flexShrink: 1,
    flexGrow: 1,
    flexWrap: 'wrap',
    marginHorizontal: 4,
    textAlign: 'left',
    fontSize: 24,
    color: DisplayCol('text'),
  },
  searchBar: {
    textAlign: 'right',
    height: 40,
    minWidth: 80,
    padding: 10,
    borderRadius: 9,
    borderBottomWidth: 1,
    borderColor: DisplayCol('accent'),
    backgroundColor: DisplayCol('primary100'),
    color: DisplayCol('text'),
    fontSize: 18,
  },
  test: {
    minWidth: 20,
    minHeight: 20,
    flex: 5,
    backgroundColor: 'black',
  }
})