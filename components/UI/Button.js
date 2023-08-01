import { Pressable, View, Text, StyleSheet } from "react-native";

import DisplayCol from "../../util/DisplayColor";

function Button({ children, onPress, mode, style }) {
  return (
    <View style={[style, styles.buttonContainer]}>
      <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText, {textTransform: 'uppercase'}]}>
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
    backgroundColor: DisplayCol('primary300'),
    borderWidth: 1,
    borderColor: DisplayCol('primary900'),
  },
  flat: {
    backgroundColor: DisplayCol('background'),
    borderColor: DisplayCol('primary300'),
  },
  buttonText: {
    fontFamily: 'Barlow',
    fontWeight: 'bold',
    color: DisplayCol('text'),
    textAlign: 'center',
  },
  flatText: {
    color: DisplayCol('primary900'),
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: DisplayCol('primary100'),
    borderRadius: 4,
  }
})