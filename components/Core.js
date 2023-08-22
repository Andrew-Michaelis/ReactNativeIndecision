import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

import DisplayCol from '../util/DisplayColor';

import AppLibrary from '../screens/AppLibrary';
import AppHome from '../screens/AppHome';
import AppSettings from '../screens/AppSettings';

const Tab = createMaterialTopTabNavigator();

function CoreNavigation () {
  const theme = useSelector((state) => state.theme);
  const [mode, setMode] = useState(theme.mode)

  useEffect(() => {
    setMode(theme.mode);
  }, [theme])

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        hidden={false} 
        backgroundColor={DisplayCol('background', mode)}
        style={mode === 'dark' ? 'light' : 'dark'}
      />
      <Tab.Navigator
        initialRouteName='AppHome'
        backBehavior='none'
        screenOptions={({ navigation, route }) => ({
          tabBarStyle: { 
            backgroundColor: DisplayCol('background', mode),
          },
          tabBarActiveTintColor: DisplayCol('accent', mode),
          tabBarInactiveTintColor: DisplayCol('hint', mode),
          tabBarIndicatorStyle: {
            backgroundColor: DisplayCol('accent', mode),
            height: 20,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
          tabBarItemStyle: {
            borderBottomWidth: 3,
            borderBlockColor: DisplayCol('background', mode),
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
            tabBarLabel: ({focused, color}) => <Text style={[styles.tabLabel, {color: color}]}>{focused ? '' : 'games'}</Text>,
            tabBarIcon: ({color}) => <SimpleLineIcons name='game-controller' size={23} color={color} />,
          }}
        />
        <Tab.Screen
          name='AppHome'
          component={AppHome}
          options={{
            title: 'Random',
            tabBarLabel: ({focused, color}) => <Text style={[styles.tabLabel, {color: color}]}>{focused ? '' : 'home'}</Text>,
            tabBarIcon: ({color}) => <SimpleLineIcons name='home' size={23} color={color} />,
          }}
        />
        <Tab.Screen
          name='AppSettings'
          component={AppSettings}
          options={{
            title: 'Settings',
            tabBarLabel: ({focused, color}) => <Text style={[styles.tabLabel, {color: color}]}>{focused ? '' : 'settings'}</Text>,
            tabBarIcon: ({color}) => <SimpleLineIcons name='settings' size={23} color={color} />,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default CoreNavigation;

const styles = StyleSheet.create({
  safeArea: {
    height: '100%',
  },
  tabLabel: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 16,
  },
})