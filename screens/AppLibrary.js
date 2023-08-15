import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";

import DisplayCol from "../util/DisplayColor";

function Library() {
  const userLibrary = useSelector((state) => state.user.lib);
  return (
    <View>
      <Text>Library Page</Text>
      <FlatList 
        data={userLibrary.games} 
        style={{backgroundColor: DisplayCol('primary300'), width: '100%', height: '100%'}}
        renderItem={({item}) => <Text style={{color: DisplayCol('text'), height: 20, width: 200}}>{item.name}</Text>}
        initialNumToRender={4}
      />
    </View>
  );
}

export default Library;