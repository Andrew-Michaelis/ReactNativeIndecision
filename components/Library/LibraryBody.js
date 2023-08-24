import { FlatList, StyleSheet, View } from "react-native";

import GameItem from "./GameItem";
import DisplayCol from "../../util/DisplayColor";

const getItemLayout = (data, index) => (
  {length: 58, offset: 58 * index, index}
)

const RenderItem = ({item, index}) => (
  <GameItem 
    index={index}
    children={item.name}
    id={item.appid}
    icon={item.img_icon_url}
  />
)

const LibraryBody = ({ sortedUserLibrary, mode }) => {
  return (
    <FlatList 
      data={sortedUserLibrary}
      renderItem={RenderItem}
      keyExtractor={item => item.appid}
      style={[styles.listContainer, {backgroundColor: DisplayCol('background', mode)}]}
      ListEmptyComponent={<View />}
      getItemLayout={getItemLayout}
    />
  )
}

export default LibraryBody;

const styles = StyleSheet.create({
  listContainer: {
    width: '100%', 
    height: '100%', 
    padding: 16,
  },
})