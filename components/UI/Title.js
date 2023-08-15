import { StyleSheet, View, Text } from "react-native";
import DisplayCol from "../../util/DisplayColor";


function Title({ children, style, textStyle }){
  return (
    <View style={[styles.textContainer, style]}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
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
    color: DisplayCol('text'),
    fontFamily: 'Barlow-Black',
    fontSize: 24,
    fontWeight: 'bold',
  },
})