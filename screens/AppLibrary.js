import { FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DisplayCol from "../util/DisplayColor";
import GameItem from "../components/Library/GameItem";
import LibraryHeader from "../components/Library/LibraryHeader";
import { sortUserLibrary } from "../src/actions/userSlice";

const getItemLayout = (data, index) => (
  {length: 58, offset: 58 * index, index}
)

const keyExtractor = (item) => item.appid

function Library() {
  const theme = useSelector((state) => state.theme);
  const [mode, setMode] = useState(theme.mode);
  const sortedUserLibrary = useSelector((state) => state.user.sortLib);
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

  const RenderItem = ({item, index}) => (
    <GameItem 
      index={index}
      children={item.name}
      id={item.appid}
      icon={item.img_icon_url}
    />
  )

  return (
    <View>
      <LibraryHeader onAvatarPress={handleAvatarPress}/>
      <FlatList 
        ref={(ref) => { this.flatListRef = ref; }}
        data={sortedUserLibrary}
        style={[styles.listContainer, {backgroundColor: DisplayCol('background', mode)}]}
        ListEmptyComponent={<View />}
        keyExtractor={keyExtractor}
        renderItem={RenderItem}
        getItemLayout={getItemLayout}
      />
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