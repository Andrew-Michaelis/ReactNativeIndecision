import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import DisplayCol from '../util/DisplayColor';

import LoadingScreen from '../screens/LoadingScreen';
import LandingScreen from '../screens/LandingScreen';
import CoreNavigation from './Core';
import { View } from 'react-native';

const Stack = createStackNavigator();

export default function MainNavigator() {
  const theme = useSelector((state) => state.theme);
  const [mode, setMode] = useState(theme.mode)

  useEffect(() => {
    setMode(theme.mode);
  }, [theme])

  return (
    <>
      <StatusBar style={mode === 'light' ? 'dark' : 'light'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='LandingPage'
          screenOptions={{
            headerTintColor: DisplayCol('text', theme.mode),
            headerShown: false,
          }}  
        >
          <Stack.Screen 
            name='LoadingScreen' 
            component={LoadingScreen}
          />
          <Stack.Screen
            name='LandingPage' 
            component={LandingScreen}
          />
          <Stack.Screen
            name='CoreNavigation'
            component={CoreNavigation}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}