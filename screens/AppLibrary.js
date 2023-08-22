import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DisplayCol from "../util/DisplayColor";
import GameItem from "../components/Library/GameItem";
import LibraryHeader from "../components/Library/LibraryHeader";

let testingArray = [];
let dupeCount = 0;
let lastDupe = 0;
let total = 0;

const getItemLayout = (data, index) => (
  {length: 58, offset: 58 * index, index}
)

const keyExtractor = (item) => item.appid

function Library() {
  const sortedLibrary = useSelector((state) => state.user.sortedLib);
  const filteredLib = sortedLibrary.filter(function(x) {
      return x !== undefined
  });
  const theme = useSelector((state) => state.theme);
  const [mode, setMode] = useState(theme.mode)

  useEffect(() => {
    setMode(theme.mode);
  }, [theme])

  function handleAvatarPress(){
    console.log(setting)
  }

  const RenderItem = ({item, index}) => (
    <GameItem 
      index={index}
      children={item.name}
      imgUrl={`http://media.steampowered.com/steamcommunity/public/images/apps/${item.appid}/${item.img_icon_url}.jpg`}
      white={item.white}
    />
  )

  return (
    <View>
      <LibraryHeader onAvatarPress={handleAvatarPress}/>
      <FlatList 
        ref={(ref) => { this.flatListRef = ref; }}
        data={filteredLib}
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