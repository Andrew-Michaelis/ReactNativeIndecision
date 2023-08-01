import { View, Text, StyleSheet } from "react-native";

import DisplayCol from "../util/DisplayColor";
import Button from "../components/UI/Button";

function pressHandler() {

}

function LandingScreen({  }) {

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.textContainer}>Landing Screen Landed</Text>
      <Button onPress={pressHandler}>a butt</Button>
      <Button onPress={pressHandler} mode='flat'>a button</Button>
      <Button onPress={pressHandler}>more buttony</Button>
      <View style={styles.buttonContainer}>
        <Button onPress={pressHandler} style={styles.button} mode='flat'>some</Button>
        <Button onPress={pressHandler} style={styles.button}>side-by-side buttons</Button>
      </View>
    </View>
  );
}

export default LandingScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    backgroundColor: DisplayCol('background'),
  },
  textContainer: {
    color: DisplayCol('text'),
    margin: 24,
    marginTop: 0,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    margin: 4,
  },
})