import { Pressable, View, Text, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, memo } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

import DisplayCol from "../../util/DisplayColor";
import { updateGameDisallow } from "../../src/actions/userSlice";

function GameItem({ sortId }) {
  const gameIndex = useSelector((state) => state.user.libIndex.indexOf(sortId))
  const gameObject = useSelector((state) => state.user.lib[gameIndex])
  const [disallowed, setDisallowed] = useState(gameObject.allow === false)
  const theme = useSelector((state) => state.theme);
  const [mode, setMode] = useState(theme.mode);

  const dispatch = useDispatch();

  const imgUrl=`http://media.steampowered.com/steamcommunity/public/images/apps/${gameObject.appid}/${gameObject.img_icon_url}.jpg`
  const storeUrl = `https://store.steampowered.com/app/${gameObject.appid}`

  useEffect(() => {
    setMode(theme.mode)
  }, [theme, disallowed])

  if(gameObject === undefined){
    return <View></View>
  }

  function allowListToggle() {
    setDisallowed(!disallowed)
    dispatch(updateGameDisallow({libIndex: gameIndex}))
  }

  return (
    <View style={
      [styles.widgetView, {
          borderColor: DisplayCol('accent', mode),
        },
        disallowed ? {backgroundColor: 'transparent', opacity: .5} : {backgroundColor: DisplayCol('primary100', mode)},
      ]}
    >
      <View style={styles.buttonView}>
        <Pressable 
          style={[styles.checkButton, {
            borderRightColor: DisplayCol('accent', mode)
          }]}
          onPress={() => allowListToggle()}
        >
          <MaterialIcons 
            name={disallowed ? 'radio-button-unchecked' : 'radio-button-checked'}
            style={[styles.checkItem, {color: DisplayCol('accent', mode)}]}
          />
        </Pressable>
        <View style={styles.textButton}>
          <Text style={{color: DisplayCol('text', mode)}}>{gameObject.name}</Text>
        </View>
        <Pressable 
          style={[styles.imageButton, {
            borderColor: DisplayCol('accent', mode)
          }]}
          onPress={() => WebBrowser.openBrowserAsync(storeUrl)}
        >
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