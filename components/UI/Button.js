import { Pressable, View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import DisplayCol from "../../util/DisplayColor";

function Button({ children, onPress, type, style }) {
  const theme = useSelector((state) => state.theme);
  const [mode, setMode] = useState(theme.mode)

  useEffect(() => {
    setMode(theme.mode);
  }, [theme])
  return (
    <View style={[styles.buttonContainer, style]}>
      <Pressable 
        onPress={onPress} 
        style={
          [style, ({pressed}) => pressed && styles.pressed, {backgroundColor: DisplayCol('primary100', mode)}]}>
        <View style={
          [styles.button, {
            backgroundColor: DisplayCol('primary300', mode),
            borderColor: DisplayCol('primary900', mode),
          }, 
          type === 'flat' && {
            backgroundColor: DisplayCol('background', mode),
            borderColor: DisplayCol('primary300', mode),
          }, style]}>
          <Text style={
            [styles.buttonText, {
              color: DisplayCol('text', mode),
            }, 
            type === 'flat' && {
              color: DisplayCol('primary900', mode),
            }, {textTransform: 'uppercase'}]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 4,
    minWidth: 100,
  },
  button: {
    borderRadius: 6,
    padding: 8,
    borderWidth: 1,
  },
  buttonText: {
    fontFamily: 'Barlow',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flatText: {
  },
  pressed: {
    opacity: 0.75,
    borderRadius: 4,
  }
})