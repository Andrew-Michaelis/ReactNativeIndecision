import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import SelectedGameButton from "../components/Home/SelectedGameButton";
import DisplayCol from "../util/DisplayColor";
import Title from "../components/UI/Title";
import GameItem from "../components/Library/GameItem";
import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/styles";

let randGamesArray = []

function Home() {
  const librarySize = useSelector((state) => state.user.count);
  const theme = useSelector((state) => state.theme);
  const [mode, setMode] = useState(theme.mode);
  const [curentGame, setCurentGame] = useState()
  function randomizeCurrentGame() {
    while (randGamesArray.length > 0) {
      randGamesArray.shift()
    }
    for (let index = 0; index < 5; index++) {
      randGamesArray.push(Math.floor(Math.random() * librarySize))
    }
    console.log(randGamesArray)
    setCurentGame(randGamesArray[0])
  }
  // randomizeCurrentGame()

  useEffect(() => {
    setMode(theme.mode);
  }, [theme, randGamesArray])

  return randGamesArray.length > 0 ? (
    <View style={[styles.homeRoot, {backgroundColor: DisplayCol('background', mode)}]}>
      <Title style={styles.title}>Your Random Game</Title>
      <SelectedGameButton index={curentGame} randPressed={randomizeCurrentGame}/>
      <Title style={styles.title}>Some Other Options</Title>
      <View style={styles.moreGames}>
        <GameItem sortIndex={randGamesArray[1]}/>
        <GameItem sortIndex={randGamesArray[2]}/>
        <GameItem sortIndex={randGamesArray[3]}/>
        <GameItem sortIndex={randGamesArray[4]}/>
      </View>
    </View>
    ) : (
    <View style={[styles.homeRoot, {backgroundColor: DisplayCol('background', mode)}, styles.homeInit]}>
      <Title 
        style={styles.title} 
        textStyle={[styles.appTitle, {textShadowColor: DisplayCol('primary900', mode)}]}>{('Indecision').toUpperCase()}</Title>
      <Button onPress={randomizeCurrentGame}>Get A Random Game</Button>
    </View>
    )
}

export default Home;

const styles = StyleSheet.create({
  homeRoot: {
    flex: 1,
    alignItems: 'center',
  },
  homeInit: {
  },
  appTitle: {
    fontSize: 64,
    color: GlobalStyles.colors.flare,
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 3,
  },
  title: {
    marginTop: 40,
  },
  moreGames: {
    maxHeight: 232,
  }
})