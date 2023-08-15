import { View, Text, StyleSheet, TextInput, Alert, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { API_KEY } from '@env';

import { updateUserName, updateUserId, updateUserAvatar, updateUserLibrary } from "../src/actions/userSlice";
import { toggleDisplay } from "../src/actions/settingSlice";

import DisplayCol from "../util/DisplayColor";
import Button from "../components/UI/Button";
import Title from "../components/UI/Title";

const findMyIdHelp = "https://help.steampowered.com/en/faqs/view/2816-BE67-5B69-0FEC"
const apiKey = API_KEY;
const pleaseWork = "76561198031476867"

function LandingScreen({ navigation }) {
  const [idInput, setIdInput] = useState('');
  const submitted = false;
  const userLibrary = useSelector((state) => state.user.lib);
  const userName = useSelector((state) => state.user.name);
  const userId = useSelector((state) => state.user.id);
  const displayMode = useSelector((state) => state.setting.display);
  const dispatch = useDispatch();

  function changeDisplaySetting() {
    let newDisplay = '';
    (displayMode === 'dark') ? newDisplay='light' : newDisplay='dark';

    dispatch(toggleDisplay(newDisplay));
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
        userObject = user.data.response.players;
        dispatch(updateUserAvatar(userObject.avatar))
        dispatch(updateUserName(userObject.personaname))
      }catch(e){
        Alert.alert(`Fetching Failed`, `Fetching profile information for ${idInput} failed. Is your profile set to public?`)
        return
      }finally{
        try{
          const lib = await axios.get(libUrl);
          userLib = lib.data.response;
          dispatch(updateUserLibrary(userLib))
        }catch(e){
          Alert.alert(`Fetching Failed`, `Fetching games for ${userName} failed. Is your profile set to public?`)
          return
        }finally{
          navigation.navigate('CoreNavigation');
        }
      }
    }
  }




  function logStuff() {
    console.log(`userId: ${userId} \nidInput: ${idInput}`)
    // console.log(`library: ${userLibrary.games}`)
  }




  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.submitForm}>
        <Title textStyle={styles.textContainer}>Enter Your Steam Id</Title>
        <TextInput 
          style={styles.userId}
          onChangeText={setIdInput}
          value={idInput}
          onLayout={()=> userId !== '' && setIdInput(userId)}
          autoComplete='off'
          autoCorrect={false}
          cursorColor={DisplayCol('text')}
          placeholder='Steam User Id'
          placeholderTextColor={DisplayCol('primary900')}
        />
        <View style={styles.buttonContainer}>
          <Button onPress={fetchInfoFunction} style={styles.button}>Submit Steam Id</Button>
        </View>
      </View>
      <View>
        <Text style={styles.textContainer}>Don't know your Steam Id?</Text>
        <Button onPress={logStuff}>Tester</Button>
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
    backgroundColor: DisplayCol('background'),
  },
  textContainer: {
    color: DisplayCol('text'),
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
    borderColor: DisplayCol('accent'),
  },
  userId: {
    textAlign: 'center',
    height: 40,
    width: '100%',
    padding: 10,
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
    borderBottomWidth: 1,
    borderColor: DisplayCol('accent'),
    backgroundColor: DisplayCol('primary100'),
    color: DisplayCol('text'),
    fontSize: 18,
  },
})