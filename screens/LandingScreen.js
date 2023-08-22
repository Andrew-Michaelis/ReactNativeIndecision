import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { API_KEY } from '@env';

import { updateUserName, updateUserId, updateUserAvatar, createUserLibrary, updateUserProfile, sortUserLibrary } from "../src/actions/userSlice";

import DisplayCol from "../util/DisplayColor";
import Button from "../components/UI/Button";
import Title from "../components/UI/Title";

const findMyIdHelp = "How to find your Steam ID: Finding your SteamID is easy. All you need to do is log into Steam via your web browser or the Steam application. From there, click your username in the top-right corner of the window and select ‘Account details’ from the dropdown menu. Your 17 digit SteamID will appear near the top of this screen, right below your Steam username. These numbers are known as your Steam 64-bit ID, and they act as a unique identifier for your Steam account. Copy them, and you’re ready to go.";
const apiKey = API_KEY;
const pleaseWork = "76561198031476867"

function LandingScreen({ navigation }) {
  const dispatch = useDispatch();
  const [idInput, setIdInput] = useState('');
  const userName = useSelector((state) => state.user.name);
  const userId = useSelector((state) => state.user.id);
  const theme = useSelector((state) => state.theme);
  const [mode, setMode] = useState(theme.mode)

  useEffect(() => {
    setMode(theme.mode);
  }, [theme])

  function findMyId() {

  }

  const isValidId = (user, input) =>{
    let idValid = '';
    let confirmingState = '';
    if(user.length === 17 && !isNaN(user)){
      idValid = true
      confirmingState = user
    }else if(input.length === 17 && !isNaN(input)){
      idValid = true
      dispatch(updateUserId(input));
      confirmingState = input
    }
    if(idValid === ''){
      if(input.length !== 17){
        Alert.alert("Invalid Id", "Your Id Is Not The Correct Length (17)");
      }else if(isNaN(input)){
        Alert.alert("Invalid Id", "Your Entered Id Contains Non-Numerical Character(s)");
      }else{
        Alert.alert("Invalid Id", "Something Went Wrong");
      }
      return;
    }
    return [idValid, confirmingState]
  }

  async function fetchInfoFunction() {
    const isValidUser = isValidId(userId, idInput);
    
    if(isValidUser[0]){
      const userUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${isValidUser[1]}`;
      const libUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${isValidUser[1]}&include_appinfo=true&format=json`;
      console.log(`userUrl: ${userUrl}\nlibUrl: ${libUrl}`);
      try{
        const user = await axios.get(userUrl);
        userObject = await user.data.response.players[0];
        console.log(`user: ${userObject.personaname}\navatar: ${userObject.avatar}\nuserprof: ${userObject.profileurl}`)
        dispatch(updateUserName(userObject.personaname))
        dispatch(updateUserAvatar(userObject.avatar))
        dispatch(updateUserProfile(userObject.profileurl))
      }catch(e){
        Alert.alert(`Fetching Failed`, `Fetching profile information for ${idInput} failed. Is your profile set to public?`)
        submitted=false;
        return
      }finally{
        try{
          let looptest = 0
          let truthy = 0
          let falsy = 0
          const lib = await axios.get(libUrl);
          userLib = lib.data.response;
          sortLib = userLib.games
          .map((obj) => {
            looptest ++
            "white" in obj ? truthy++ : falsy++
            return ("white" in obj) ? obj : {white: true, ...obj}
          })
          .sort((a, b) => {
            a.appid - b.appid
          });
          console.log(`count: ${userLib.game_count}\nlooped: ${looptest}\ntruthy: ${truthy}\nfalsy: ${falsy}\nitemOne: ${JSON.stringify(userLib.games[0])}`)
          dispatch(createUserLibrary(userLib))
          dispatch(sortUserLibrary(sortLib))
        }catch(e){
          Alert.alert(`Fetching Failed`, `Fetching games for ${userName} failed. Is your profile set to public?`)
          submitted=false;
          return
        }finally{
          navigation.navigate('CoreNavigation');
        }
      }
    }
  }

  return (
    <SafeAreaView style={[styles.rootContainer,{backgroundColor: DisplayCol('background', mode)}]}>
      <View style={styles.submitForm}>
        <Title textStyle={[styles.textContainer,{color: DisplayCol('text', mode)}]}>Enter Your Steam Id</Title>
        <TextInput 
          style={[styles.userId,{
            borderColor: DisplayCol('accent', mode),
            backgroundColor: DisplayCol('primary100', mode),
            color: DisplayCol('text', mode),
          }]}
          onChangeText={(text) => setIdInput(text)}
          value={idInput}
          onLayout={()=> userId === '' ? setIdInput(pleaseWork) : setIdInput(userId)}
          autoComplete='off'
          autoCorrect={false}
          cursorColor={DisplayCol('text', mode)}
          placeholder='Steam User Id'
          placeholderTextColor={DisplayCol('primary900', mode)}
        />
        <View style={styles.buttonContainer}>
          <Button 
            onPress={fetchInfoFunction} 
            style={[styles.button,{borderColor: DisplayCol('accent', mode)}]}
          >Submit Steam Id</Button>
        </View>
      </View>
      <View>
        <Text style={[styles.textContainer,{color: DisplayCol('text', mode)}]}>Don't know your Steam Id?</Text>
        <Button onPress={findMyId}>Tester</Button>
      </View>
    </SafeAreaView>
  );
}

export default LandingScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textContainer: {
    marginHorizontal: 24,
    marginVertical: 0,
  },
  submitForm: {
    marginTop: 12,
    width: '90%',
  },
  buttonContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    flexGrow: 1,
    marginVertical: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
  },
  userId: {
    textAlign: 'center',
    height: 40,
    width: '100%',
    padding: 10,
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
    borderBottomWidth: 1,
    fontSize: 18,
  },
})