import { Image, Pressable, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import DisplayCol from "../../util/DisplayColor";

function UserIcon({ onPress, mode }) {
  const userIcon = useSelector((state) => state.user.avatarUrl);

  return (
  <Pressable 
    style={[mode === 'big' ? styles.bigButton : styles.imageButton]}
    onPress={onPress}
  >
    <Image 
      source={{uri: userIcon}}
      style={styles.imageItem}
    />
  </Pressable>
  )
}

export default UserIcon;

const styles = StyleSheet.create({
  imageButton: {
    margin: 4,
    height: 40,
    width: 40,
    
    borderWidth: 2,
    borderRadius: 8,
    borderColor: DisplayCol('accent'),
    overflow: 'hidden',
  },
  bigButton: {
    margin: 10,
    height: 100,
    width: 100,
    
    borderWidth: 4,
    borderRadius: 20,
    borderColor: DisplayCol('accent'),
    overflow: 'hidden',
  },
  imageItem: {
    flex: 1,
    backgroundColor: DisplayCol('background'),
  },
})