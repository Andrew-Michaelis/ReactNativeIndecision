import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DisplayCol from '../util/DisplayColor';

import LoadingScreen from '../screens/LoadingScreen';
import LandingScreen from '../screens/LandingScreen';
import CoreNavigation from '../components/Core';

const Stack = createStackNavigator();

export default function ThemeContainer() {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const [mode, setMode] = useState(theme.mode)

  const handleThemeChange = () => {
    dispatch(toggleTheme())
  }

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
            initialParams={{mode: mode}}
          />
          <Stack.Screen
            name='LandingPage' 
            component={LandingScreen}
            initialParams={{mode: mode}}
          />
          <Stack.Screen
            name='CoreNavigation'
            component={CoreNavigation}
            initialParams={{mode: mode}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}