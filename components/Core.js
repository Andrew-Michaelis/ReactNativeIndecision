import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

import DisplayCol from '../util/DisplayColor';

import AppLibrary from '../screens/AppLibrary';
import AppHome from '../screens/AppHome';
import AppSettings from '../screens/AppSettings';
import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

function CoreNavigation () {
  return (
    <>
      <StatusBar hidden={true} />
      <Tab.Navigator
        initialRouteName='AppHome'
        backBehavior='none'
        screenOptions={({ navigation, route }) => ({
          tabBarStyle: { 
            backgroundColor: DisplayCol('background'),
          },
          tabBarActiveTintColor: DisplayCol('accent'),
          tabBarInactiveTintColor: DisplayCol('hint'),
          tabBarIndicatorStyle: {
            backgroundColor: DisplayCol('accent'),
            height: 20,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
          tabBarItemStyle: {
            borderBottomWidth: 3,
            borderBlockColor: DisplayCol('background'),
          },
          tabBarIconStyle: { 
            justifyContent: 'center', 
            alignItems: 'center',
          },
        })}
      >
        <Tab.Screen
          name='AppLibrary'
          component={AppLibrary}
          options={{
            title: 'Library',
            tabBarLabel: ({focused, color}) => <Text style={{color: color, textTransform: 'uppercase'}}>{focused ? '' : 'games'}</Text>,
            tabBarIcon: ({color}) => <SimpleLineIcons name='game-controller' size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name='AppHome'
          component={AppHome}
          options={{
            title: 'Random',
            tabBarLabel: ({focused, color}) => <Text style={{color: color, textTransform: 'uppercase'}}>{focused ? '' : 'home'}</Text>,
            tabBarIcon: ({color}) => <SimpleLineIcons name='home' size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name='AppSettings'
          component={AppSettings}
          options={({ route }) => ({
            title: 'Settings',
            tabBarLabel: ({focused, color}) => <Text style={{color: color, textTransform: 'uppercase'}}>{focused ? '' : 'settings'}</Text>,
            tabBarIcon: ({color}) => <SimpleLineIcons name='settings' size={24} color={color} />,
          })}
        />
      </Tab.Navigator>
    </>
  );
}

export default CoreNavigation;

const styles = StyleSheet.create({
  barTab: {
    backgroundColor: DisplayCol('background'),
    fontFamily: 'Barlow',
    fontWeight: 'bold',
    fontSize: 30,
  }
})