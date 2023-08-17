import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import DisplayCol from "../util/DisplayColor";
import GameItem from "../components/Library/GameItem";
import LibraryHeader from "../components/Library/LibraryHeader";

function Library() {
  const userLibrary = useSelector((state) => state.user.lib.games);

  const setting = useSelector((state) => state.setting.display);

  function handleAvatarPress(){
    console.log(setting)
  }

  return (
    <View>
      <LibraryHeader onAvatarPress={handleAvatarPress}/>
      <FlatList 
        ref={(ref) => { this.flatListRef = ref; }}
        data={userLibrary}
        initialNumToRender={10}
        style={styles.listContainer}
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
    backgroundColor: DisplayCol('background'),
    width: '100%', 
    height: '100%', 
    padding: 16,
  },
})