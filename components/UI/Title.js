import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DisplayCol from "../../util/DisplayColor";

function Title({ children, style, textStyle }){
  const theme = useSelector((state) => state.theme);
  const [mode, setMode] = useState(theme.mode);

  useEffect(() => {
    setMode(theme.mode);
  }, [theme])

  return (
    <View style={[styles.textContainer, style]}>
      <Text style={[styles.text, {color: DisplayCol('text', mode)}, textStyle]}>{children}</Text>
    </View>
  )
}

export default Title;

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    margin: 12,
  },
  text: {
    fontFamily: 'Barlow-Black',
    fontSize: 24,
    fontWeight: 'bold',
  },
})