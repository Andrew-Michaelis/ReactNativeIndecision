import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import SelectedGameButton from "../components/Home/SelectedGameButton";
import DisplayCol from "../util/DisplayColor";
import Title from "../components/UI/Title";
import { FlatList } from "react-native-gesture-handler";
import GameItem from "../components/Library/GameItem";
import Button from "../components/UI/Button";

const getItemLayout = (data, index) => (
  {length: 58, offset: 58 * index, index}
)
let randGamesArray = []

function Home() {
  const sortedLibIndex = useSelector((state) => state.user.sortLibIndex)
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
    setCurentGame(randGamesArray[0])
    console.log(JSON.stringify(randGamesArray))
  }
  randomizeCurrentGame()

  const flatListIndexArray = randGamesArray.map((id, index) => index !== 0)

  useEffect(() => {
    setMode(theme.mode);
  }, [theme, curentGame])

  const RenderItem = ({item}) => {
    const index = sortedLibIndex.indexOf(item);
    return (
      <GameItem 
        sortIndex={index}
      />
    )
  }

  return randGamesArray.length > 0 ? (
    <View style={[styles.homeRoot, {backgroundColor: DisplayCol('background', mode)}]}>
      <Title style={styles.title}>Your Random Game</Title>
      <SelectedGameButton index={curentGame} randPressed={randomizeCurrentGame}/>
      <Title style={styles.title}>Some Other Options</Title>
      <FlatList 
        data={flatListIndexArray}
        renderItem={RenderItem}
        keyExtractor={item => item}
        style={[styles.listContainer]}
        ListEmptyComponent={<View />}
        getItemLayout={getItemLayout}
        minimumViewTime={5000}
      />
    </View>
    ) : (
    <View style={[styles.homeRoot, {backgroundColor: DisplayCol('background', mode)}]}>
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
  title: {
    marginTop: 40,
  }
})