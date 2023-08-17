import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import DisplayCol from "../util/DisplayColor";
import GameItem from "../components/Library/GameItem";
import LibraryHeader from "../components/Library/LibraryHeader";

function Library() {
  const userLibrary = useSelector((state) => state.user.lib.games);

  function handleAvatarPress(){
    console.log(userLibrary[0].white)
  }

  return (
    <View>
      <LibraryHeader onAvatarPress={handleAvatarPress}/>
      {console.log(`postheader`)}
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
      {console.log(`post list`)}
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