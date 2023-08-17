import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { API_KEY } from '@env';

import { updateUserName, updateUserId, updateUserAvatar, createUserLibrary, updateUserProfile } from "../src/actions/userSlice";

import DisplayCol from "../util/DisplayColor";
import Button from "../components/UI/Button";
import Title from "../components/UI/Title";

const findMyIdHelp = "https://help.steampowered.com/en/faqs/view/2816-BE67-5B69-0FEC"
const apiKey = API_KEY;
const pleaseWork = "76561198031476867"

function LandingScreen({ route, navigation }) {
  const theme = route.params.mode;
  const [idInput, setIdInput] = useState('');
  const submitted = false;
  const userLibrary = useSelector((state) => state.user.lib);
  const userName = useSelector((state) => state.user.name);
  const userId = useSelector((state) => state.user.id);
  const displayMode = useSelector((state) => state.setting.display);
  const dispatch = useDispatch();

  function findMyId() {

  }

  const isValidId = (user, input) =>{
    let idValid = '';
    if(user.length === 17 && !isNaN(user)){
      idValid = true
    }else if(input.length === 17 && !isNaN(input)){
      idValid = true
      dispatch(updateUserId(input));
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
    return idValid
  }

  async function fetchInfoFunction() {
    const isValidUser = isValidId(userId, idInput);
    
    if(isValidUser){
      const userUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${idInput}`;
      const libUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${idInput}&include_appinfo=true&format=json`;
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
          userLib.games.forEach(element => {
            looptest ++
            "white" in element ? truthy++ : falsy++
            return ("white" in element) ? element : {...element, white: true}
          });
          console.log(`count: ${userLib.game_count}\nlooped: ${looptest}\ntruthy: ${truthy}\nfalsy: ${falsy}\nitemOne: ${JSON.stringify(userLib.games[0])}`)
          dispatch(createUserLibrary(userLib))
          console.log("postdispatch")
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
    <SafeAreaView style={[styles.rootContainer,{backgroundColor: DisplayCol('background', theme)}]}>
      <View style={styles.submitForm}>
        <Title textStyle={[styles.textContainer,{color: DisplayCol('text', theme)}]}>Enter Your Steam Id</Title>
        <TextInput 
          style={[styles.userId,{
            borderColor: DisplayCol('accent', theme),
            backgroundColor: DisplayCol('primary100', theme),
            color: DisplayCol('text', theme),
          }]}
          onChangeText={setIdInput}
          value={idInput}
          onLayout={()=> userId === '' && setIdInput(pleaseWork)}
          autoComplete='off'
          autoCorrect={false}
          cursorColor={DisplayCol('text', theme)}
          placeholder='Steam User Id'
          placeholderTextColor={DisplayCol('primary900', theme)}
        />
        <View style={styles.buttonContainer}>
          <Button 
            onPress={fetchInfoFunction} 
            style={[styles.button,{borderColor: DisplayCol('accent', theme)}]}
          >Submit Steam Id</Button>
        </View>
      </View>
      <View>
        <Text style={styles.textContainer}>Don't know your Steam Id?</Text>
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