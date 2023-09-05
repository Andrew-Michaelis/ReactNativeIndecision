import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import * as WebBrowser from "expo-web-browser";

import LibraryHeader from "../components/Library/LibraryHeader";
import GameItem from "../components/Library/GameItem"

import DisplayCol from "../util/DisplayColor";
import Title from "../components/UI/Title";
import SortUserLibrary from "../util/SortUserLibrary";

const getItemLayout = (data, index) => (
  {length: 58, offset: 58 * index, index}
)

function Library() {
  const theme = useSelector((state) => state.theme);
  const [mode, setMode] = useState(theme.mode);

  const lib = useSelector((state) => state.user.lib);
  const orderRule = useSelector((state) => state.sorter.order);
  const searchRule = useSelector((state) => state.sorter.search);
  const filter = {order: orderRule, search: searchRule};

  const profileUrl = useSelector((state) => state.user.profileUrl);

  useEffect(() => {
    setMode(theme.mode);
  }, [theme, filter])

  const RenderItem = ({item}) => {
    return (
      <GameItem 
        sortId={item}
      />
    )
  }

  function handleAvatarPress() {
    WebBrowser.openBrowserAsync(profileUrl)
  }

  const sortedLibrary =  SortUserLibrary(filter, lib);

  const LibraryBody = useMemo(() => {
    // console.log(`Memo Updated...`) // debug info, displays given string every time an update occurs
    return (
      <View style={[styles.libraryRoot, {backgroundColor: DisplayCol('background', mode)}]}>
        <Title>Library</Title>
        <FlatList 
          data={sortedLibrary}
          renderItem={RenderItem}
          keyExtractor={item => item}
          style={[styles.listContainer]}
          ListEmptyComponent={<View />}
          getItemLayout={getItemLayout}
          minimumViewTime={5000}
        />
      </View>
    )
  }, [mode, filter])

  return (
    <View>
      <LibraryHeader onAvatarPress={handleAvatarPress}/>
      {LibraryBody}
    </View>
  )
}

export default Library;

const styles = StyleSheet.create({
  libraryRoot: {
    width: '100%', 
    height: '100%', 
  },
  listContainer: {
    paddingHorizontal: 16,
    marginBottom: 70,
  },
})