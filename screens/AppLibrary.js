import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DisplayCol from "../util/DisplayColor";
import GameItem from "../components/Library/GameItem";
import LibraryHeader from "../components/Library/LibraryHeader";

function Library() {
  const userLibrary = useSelector((state) => state.user.lib.games);
  const sortedLibrary = useSelector((state) => state.user.sortedLib);
  const theme = useSelector((state) => state.theme);
  const [mode, setMode] = useState(theme.mode)

  useEffect(() => {
    setMode(theme.mode);
  }, [theme])

  function handleAvatarPress(){
    console.log(setting)
  }

  return (
    <View>
      <LibraryHeader onAvatarPress={handleAvatarPress}/>
      <FlatList 
        ref={(ref) => { this.flatListRef = ref; }}
        data={sortedLibrary}
        initialNumToRender={10}
        style={[styles.listContainer, {backgroundColor: DisplayCol('background', mode)}]}
        ListEmptyComponent={<View />}
        keyExtractor={(item) => item.appid}
        renderItem={({item}) => 
          <GameItem 
            children={item.name}
            imgUrl={`http://media.steampowered.com/steamcommunity/public/images/apps/${item.appid}/${item.img_icon_url}.jpg`}
            white={item.white}
          />
        }
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