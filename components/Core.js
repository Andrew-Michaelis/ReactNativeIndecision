
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

import { GlobalStyles } from '../constants/styles';
import DisplayCol from '../util/DisplayColor';

import AppLibrary from '../screens/AppLibrary';
import AppHome from '../screens/AppHome';
import AppSettings from '../screens/AppSettings';

const Tab = createMaterialTopTabNavigator();

function CoreNavigation () {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        initialRouteName: 'AppHome',
        headerStyle: { backgroundColor: DisplayCol('background') },
        headerTintColor: DisplayCol('text'),
        tabBarStyle: { backgroundColor: DisplayCol('background') },
        tabBarActiveTintColor: GlobalStyles,
        // headerRight: ({ tintColor }) => (
        //   <ImageButton
        //     image=CONTEXT_USER_ICON
        //     size=24
        //     onPress={()=>{
        //       menu popup - logout button, last synced text, resync button
        //       logout onpress = logout then, navigation.navigate('LandingScreen')
        //       resync button makes webcall and checks for changes since last call before consolidating then saving context
        //     }}
        //   />
        // )
      })}
    >
      <Tab.Screen
        name='AppLibrary'
        component={AppLibrary}
        options={{
          title: 'Library',
          tabBarLabel: 'Lib',
          tabBarIcon: ({color, size}) => <SimpleLineIcons name='game-controller' size={size} color={color} />
        }}
      />
      <Tab.Screen
        name='AppHome'
        component={AppHome}
        options={{
          title: 'Random',
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => <SimpleLineIcons name='home' size={size} color={color} />
        }}
      />
      <Tab.Screen
        name='AppSettings'
        component={AppSettings}
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => <SimpleLineIcons name='settings' size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

export default CoreNavigation;