import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";

import DisplayCol from "../util/DisplayColor";
import GameItem from "../components/Library/GameItem";

function Library() {
  const userLibrary = useSelector((state) => state.user.lib.games);

  function handleDetailNavigation(id) {

  }
  
  function handleDetailCheckbox(id) {

  }

  return (
    <View>
      <Text>Library Page</Text>
      <FlatList 
        ref={(ref) => { this.flatListRef = ref; }}
        data={userLibrary}
        initialNumToRender={10}
        style={{backgroundColor: DisplayCol('background'), width: '100%', height: '100%', padding: 16,}}
        renderItem={({item}) => 
          <GameItem 
            children={item.name}
            imgUrl={`http://media.steampowered.com/steamcommunity/public/images/apps/${item.appid}/${item.img_icon_url}.jpg`}
            white={true}
          />
        }
      />
    </View>
  );
}

export default Library;