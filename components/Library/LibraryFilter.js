import { StyleSheet, View, TextInput } from "react-native";
import { useState } from "react";

import DisplayCol from "../../util/DisplayColor";

function LibraryFilter(){
  const [searchInput, setSearchInput] = useState('');

  return (
    <View>
      <TextInput 
        style={styles.searchBar}
        editable={false}
        onChangeText={setSearchInput}
        value={searchInput}
        autoComplete='off'
        autoCorrect={false}
        cursorColor={DisplayCol('text')}
        placeholder='search games'
        placeholderTextColor={DisplayCol('primary900')}
      />
    </View>
  )
}

export default LibraryFilter;

const styles = StyleSheet.create({
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
})