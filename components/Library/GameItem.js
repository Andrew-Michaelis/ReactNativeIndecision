import { Pressable, View, Text, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, memo } from "react";
import { MaterialIcons } from '@expo/vector-icons';

import DisplayCol from "../../util/DisplayColor";
import { getDisallowList } from "../../src/actions/userSlice";

let once = 0

function GameItem({index, children, id, icon}) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const [mode, setMode] = useState(theme.mode);
  const disallowList = useSelector((state) => state.user.disallow)

  const imgUrl=`http://media.steampowered.com/steamcommunity/public/images/apps/${id}/${icon}.jpg`

  useEffect(() => {
    setMode(theme.mode);
  }, [theme])

  function allowListToggle() {
    console.log(`index: ${index} || w: ${white}`)
    once === 0 && dispatch(allowListToggle(index)) && once++
  }

  return (
    <View style={
      [styles.widgetView, {
        borderColor: DisplayCol('accent', mode),
        backgroundColor: DisplayCol('primary100', mode),
      }]}
    >
      <View style={styles.buttonView}>
        <Pressable 
          style={[styles.checkButton, {
            borderRightColor: DisplayCol('accent', mode)
          }]}
          onPress={() => allowListToggle()}
        >
          <MaterialIcons 
            name={disallowList.includes(id) ? 'radio-button-unchecked' : 'radio-button-checked'}
            style={[styles.checkItem, {color: DisplayCol('accent', mode)}]}
          />
        </Pressable>
        <View style={styles.textButton}>
          <View style={styles.justifyYouJerk}>
            <Text style={{color: DisplayCol('text', mode)}}>{children}</Text>
          </View>
        </View>
        <Pressable style={[styles.imageButton, {borderColor: DisplayCol('accent', mode)}]}>
          <Image 
            defaultSource={require('../../assets/icon.png')}
            source={{uri: imgUrl}}
            style={[styles.imageItem, {backgroundColor: DisplayCol('background')}]}
          />
        </Pressable>
      </View>
    </View>
  )
}

function equal(prev, next) {
  if(prev.children !== next.children) {
    return false;
  }
  return true;
}

export default memo(GameItem, equal);

const styles = StyleSheet.create({
  widgetView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 4,
    height: 50,
    width: 300,
    borderWidth: 2,
    borderRadius: 8,
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkButton: {
    paddingHorizontal: 4,
    borderRightWidth: 2,
  },
  checkItem: {
    fontSize: 32,
  },
  textButton: {
    flexShrink: 1,
    flexGrow: 1,
    padding: 5,
  },
  imageButton: {
    margin: 4,
    height: 40,
    width: 40,
    
    borderWidth: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageItem: {
    flex: 1,
  },
})