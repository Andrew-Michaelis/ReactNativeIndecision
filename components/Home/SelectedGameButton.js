import { useEffect, useState } from "react";
import { Pressable, Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import * as WebBrowser from 'expo-web-browser';

import DisplayCol from "../../util/DisplayColor";

function SelectedGameButton({ index }) {
  const theme = useSelector((state) => state.theme);
  const [mode, setMode] = useState(theme.mode);
  let gameObject = useSelector((state) => state.user.lib[index])

  const imgUrl = `http://media.steampowered.com/steamcommunity/public/images/apps/${gameObject.appid}/${gameObject.img_icon_url}.jpg`
  const storeUrl = `https://store.steampowered.com/app/${gameObject.appid}`

  useEffect(() => {
    setMode(theme.mode);
  }, [theme])
  
  return(
    <View
      style={[
        styles.componentContainer, 
        {
          backgroundColor: DisplayCol('primary100', mode),
          borderColor: DisplayCol('accent', mode)
        }
      ]}
    >
      <View style={styles.textButton}>
        <Text 
          style={[styles.text, {color: DisplayCol('text', mode)}]}
          adjustsFontSizeToFit
        >{gameObject.name}</Text>
      </View>
      <Pressable 
        style={[styles.imageButton, {borderColor: DisplayCol('accent', mode)}]}
        onPress={() => WebBrowser.openBrowserAsync(storeUrl)}
      >
        <Image 
          defaultSource={require('../../assets/icon.png')}
          source={{uri: imgUrl}}
          style={[styles.imageItem, {backgroundColor: DisplayCol('background')}]}
        />
      </Pressable>
    </View>
  )
}

export default SelectedGameButton;

const styles = StyleSheet.create({
  componentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 120,
    width: 300,
    borderRadius: 16,
    borderWidth: 2,
  },
  textButton: {
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: 64,
  },
  text: {
    fontSize: 40,
  },
  button: {
    marginVertical: 0
  },
  imageButton: {
    height: 100,
    width: 100,
    margin: 8,
    borderWidth: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageItem: {
    flex: 1,
  },
})