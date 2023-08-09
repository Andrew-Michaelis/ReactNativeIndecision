import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { API_KEY } from '@env';
import * as AuthSession from 'expo-auth-session';
import 'react-native-get-random-values';
import { v4 } from 'uuid';

import { updateUsername } from "../src/actions/userSlice";
import { toggleDisplay } from "../src/actions/settingSlice";

import DisplayCol from "../util/DisplayColor";
import Button from "../components/UI/Button";

const userId = v4();
const apiKey = API_KEY;
const defaultUrl = `https://steamcommunity.com/openid`;
const useProxy = true;
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

function LandingScreen({ navigation }) {
  const user = useSelector((state) => state.user.name);
  const displayMode = useSelector((state) => state.setting.display);
  const dispatch = useDispatch();

  const config = {
    redirectUri,
    clientId: `${userId}`,
    responseType: 'code',
    scopes: ['openid', 'profile'],
  };
  const discovery = AuthSession.useAutoDiscovery(defaultUrl)
  const [request, result, promptAsync] = AuthSession.useAuthRequest(config, discovery);

  function pressHandler() {

    navigation.navigate('CoreNavigation');
  }

  function saveUsername() {
    let newUsername = '';
    (user === 'Mandy') ? newUsername='Billy' : newUsername='Mandy';
    if (newUsername === '') return;

    dispatch(updateUsername(newUsername));
  }

  function changeDisplaySetting() {
    let newDisplay = '';
    (displayMode === 'dark') ? newDisplay='light' : newDisplay='dark';

    dispatch(toggleDisplay(newDisplay));
  }

  function httpRequest() {
    try{
      promptAsync({useProxy});
    }catch(e){
      console.log(e);
    }
  }

  const fetchUser = async () => {
    const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=76561197960435530`;
    const response = await axios.get(url);
    console.log(response.data.response.players);
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Text style={styles.textContainer}>Landing Screen Landed: {user}</Text>
      <Button onPress={saveUsername}>a butt</Button>
      <Button onPress={changeDisplaySetting} mode='flat'>{displayMode}</Button>
      <Button onPress={fetchUser}>more buttony</Button>
      <View style={styles.buttonContainer}>
        <Button onPress={pressHandler} style={styles.button} mode='flat'>some</Button>
        <Button onPress={httpRequest} style={styles.button} disabled={!request}>{result || "SITS"}</Button>
      </View>
    </SafeAreaView>
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