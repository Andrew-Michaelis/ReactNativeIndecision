import { StyleSheet, View, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DisplayCol from "../../util/DisplayColor";
import { sortUserLibrary } from "../../src/actions/userSlice";
import SearchButton from "./SearchButton";

function LibraryFilter(){
  const userLibrary = useSelector((state) => state.user.lib)
  const theme = useSelector((state) => state.theme);
  const [mode, setMode] = useState(theme.mode)
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useDispatch();

  let canEdit = true;

  useEffect(() => {
    setMode(theme.mode);
  }, [theme])

  function applySort(order, search) {
    typeof search === 'string' ? search = search : search = "";
    console.log(`o: ${order} ||I|| s: ${search}`);
    canEdit = false;
    let testName = new String();
    const sortReg = search.toLowerCase();
    const sortedLib = userLibrary.games
      .filter((obj) => {
        return obj.name.toLowerCase().match(sortReg) !== null
      })
      .sort((objA, objB) => {
        switch(order) {
          case 'alphabetical':
            return ((objA.name === objB.name) ? 0 : ((objA.name < objB.name) ? 1 : -1))
          case 'reverseAlphabetical':
            return ((objA.name === objB.name) ? 0 : ((objA.name > objB.name) ? 1 : -1))
          case 'playtime':
            return ((objA.playtime_forever === objB.playtime_forever) ? 0 : ((objA.playtime_forever > objB.playtime_forever) ? 1 : -1))
          case 'lastplayed':
            return ((objA.rtime_last_played === objB.rtime_last_played) ? 0 : ((objA.rtime_last_played > objB.rtime_last_played) ? 1 : -1))
          default:
            console.log(`1: ${objA} || 2: ${objB} ||| ${JSON.stringify(objA)}\n${JSON.stringify(objB)}`)
            return objA.appid - objB.appid
        }
      })
      .map((obj) => {
        testName += (obj.name + " I:.:I ")
      })
    dispatch(sortUserLibrary(sortedLib));
    canEdit = true;
    magic = false;
  }

  return (
    <View style={styles.searchContainer}>
      <TextInput 
        style={[styles.searchBar, {
          borderColor: DisplayCol('accent', mode),
          backgroundColor: DisplayCol('primary100', mode),
          color: DisplayCol('text', mode),
        }]}
        editable={canEdit}
        onChangeText={(input) => setSearchInput(input)}
        value={searchInput}
        autoComplete='off'
        autoCorrect={false}
        cursorColor={DisplayCol('text', mode)}
        placeholder='search games'
        placeholderTextColor={DisplayCol('primary900', mode)}
      />
      <SearchButton 
        onSearch={() => applySort(null, searchInput)}
        filt={searchInput}
        style={[styles.searchButton, {backgroundColor: DisplayCol('primary700', mode)}]}
      />
    </View>
  )
}

export default LibraryFilter;

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    minWidth: 100,
  },
  searchBar: {
    textAlign: 'right',
    height: 40,
    minWidth: 80,
    padding: 10,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    borderBottomWidth: 1,
    fontSize: 18,
  },
  searchButton: {
    minWidth: 20,
  },
})