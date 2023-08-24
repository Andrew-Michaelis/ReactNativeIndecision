import { FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import LibraryHeader from "../components/Library/LibraryHeader";
import GameItem from "../components/Library/GameItem"

import DisplayCol from "../util/DisplayColor";
import { sortUserLibrary } from "../src/actions/userSlice";

const getItemLayout = (data, index) => (
  {length: 58, offset: 58 * index, index}
)

function Library() {
  const theme = useSelector((state) => state.theme);
  const [mode, setMode] = useState(theme.mode);
  const sortedLibraryIndexArray = useSelector((state) => state.user.sortLibIndex)
  const changedSort = useSelector((state) => state.user.sortLib.length)
  console.log("Library");

  const orderRule = useSelector((state) => state.sorter.order);
  const searchRule = useSelector((state) => state.sorter.search);
  const filter = {order: orderRule, search: searchRule};

  const dispatch = useDispatch();

  const fetchLibrary = () => {
    console.log(`fetchFilt: ${JSON.stringify(filter)}`)
    dispatch(sortUserLibrary(filter));
  }

  useEffect(() => {
    setMode(theme.mode);
  }, [theme, filter])

  function handleAvatarPress(){
    fetchLibrary();
  }

  const RenderItem = ({item, index}) => {
    return (
    <GameItem 
      sortIndex={index}
    />)
    }

  const LibraryBody = useMemo(() => {
    console.log(`Memo Updated...\n`)
    return (
      <FlatList 
        data={sortedLibraryIndexArray}
        renderItem={RenderItem}
        keyExtractor={item => item}
        style={[styles.listContainer, {backgroundColor: DisplayCol('background', mode)}]}
        ListEmptyComponent={<View />}
        getItemLayout={getItemLayout}
        minimumViewTime={5000}
      />
    )
  }, [sortedLibraryIndexArray, mode, changedSort, filter])

  return (
    <View>
      <LibraryHeader onAvatarPress={handleAvatarPress}/>
      {LibraryBody}
    </View>
  )
}

export default Library;

const styles = StyleSheet.create({
  listContainer: {
    width: '100%', 
    height: '100%', 
    padding: 16,
  },
})