import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

import DisplayCol from '../util/DisplayColor';

import AppLibrary from '../screens/AppLibrary';
import AppHome from '../screens/AppHome';
import AppSettings from '../screens/AppSettings';

const Tab = createMaterialTopTabNavigator();

function CoreNavigation ({ route }) {
  const theme = route.params.mode;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        hidden={false} 
        backgroundColor={DisplayCol('background', theme)}
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Tab.Navigator
        initialRouteName='AppHome'
        backBehavior='none'
        screenOptions={({ navigation, route }) => ({
          tabBarStyle: { 
            backgroundColor: DisplayCol('background', theme),
          },
          tabBarActiveTintColor: DisplayCol('accent', theme),
          tabBarInactiveTintColor: DisplayCol('hint', theme),
          tabBarIndicatorStyle: {
            backgroundColor: DisplayCol('accent', theme),
            height: 20,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
          tabBarItemStyle: {
            borderBottomWidth: 3,
            borderBlockColor: DisplayCol('background', theme),
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
          initialParams={{mode: theme}}
        />
        <Tab.Screen
          name='AppHome'
          component={AppHome}
          options={{
            title: 'Random',
            tabBarLabel: ({focused, color}) => <Text style={[styles.tabLabel, {color: color}]}>{focused ? '' : 'home'}</Text>,
            tabBarIcon: ({color}) => <SimpleLineIcons name='home' size={23} color={color} />,
          }}
          initialParams={{mode: theme}}
        />
        <Tab.Screen
          name='AppSettings'
          component={AppSettings}
          options={{
            title: 'Settings',
            tabBarLabel: ({focused, color}) => <Text style={[styles.tabLabel, {color: color}]}>{focused ? '' : 'settings'}</Text>,
            tabBarIcon: ({color}) => <SimpleLineIcons name='settings' size={23} color={color} />,
          }}
          initialParams={{mode: theme}}
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