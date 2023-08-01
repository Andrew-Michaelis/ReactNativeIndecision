import { Image, StyleSheet, View } from "react-native";

import { GlobalStyles } from "../constants/styles";

function LoadingScreen() {
  return (
    <View>
      <Image source={require('../assets/indecision-logo184trans.png')} />
    </View>
  );
}

export default LoadingScreen;

const styles = StyleSheet.create({
  defaultStyle: {
    flex: 1,
  },
  darkStyle: {
    backgroundColor: GlobalStyles.dark.background,
  },
  lightStyle: {
    backgroundColor: GlobalStyles.light.background,
  },
})