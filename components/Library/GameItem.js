import { Pressable, View, Text, StyleSheet, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

import DisplayCol from "../../util/DisplayColor";

function GameItem({children, white, imgUrl}) {
  return(
    <View style={styles.widgetView}>
      <View style={styles.buttonView}>
        <Pressable style={styles.checkButton}>
          <MaterialIcons 
            name={white ? 'radio-button-checked' : 'radio-button-unchecked'}
            style={styles.checkItem}
          />
        </Pressable>
        <View style={styles.textButton}>
          <View style={styles.justifyYouJerk}>
            <Text style={styles.textItem}>{children}</Text>
          </View>
        </View>
        <Pressable style={styles.imageButton}>
          <Image 
            defaultSource={require('../../assets/icon.png')}
            source={{uri: imgUrl}}
            style={styles.imageItem}
          />
        </Pressable>
      </View>
    </View>
  )
}

export default GameItem;

const styles = StyleSheet.create({
  widgetView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 4,
    height: 50,
    width: '90%',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: DisplayCol('accent'),
    backgroundColor: DisplayCol('primary100'),
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkButton: {
    paddingHorizontal: 4,
    borderRightColor: DisplayCol('accent'),
    borderRightWidth: 2,
  },
  checkItem: {
    fontSize: 32,
    color: DisplayCol('accent'),
  },
  textButton: {
    flexShrink: 1,
    flexGrow: 1,
    padding: 5,
  },
  textItem: {
    color: DisplayCol('text'),
  },
  imageButton: {
    margin: 4,
    height: 40,
    width: 40,
    
    borderWidth: 2,
    borderRadius: 8,
    borderColor: DisplayCol('accent'),
    overflow: 'hidden',
  },
  imageItem: {
    flex: 1,
    backgroundColor: DisplayCol('background'),
  },
})