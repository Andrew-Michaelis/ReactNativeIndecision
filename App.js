import 'react-native-gesture-handler';
import { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import DisplayCol from './util/DisplayColor';
import { store } from './src/state/store';

import LoadingScreen from './screens/LoadingScreen';
import LandingScreen from './screens/LandingScreen';
import CoreNavigation from './components/Core';

// SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Barlow' : require('./assets/fonts/Barlow-Regular.ttf'),
    'Barlow-Bold' : require('./assets/fonts/Barlow-Bold.ttf'),
    'Barlow-Light' : require('./assets/fonts/Barlow-Light.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar style='light' />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='LandingPage'
          screenOptions={{
            headerStyle: { 
              backgroundColor: DisplayCol('background'),
            },
            headerTintColor: DisplayCol('text'),
          }}  
        >
          <Stack.Screen 
            name='LoadingScreen' 
            component={LoadingScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='LandingPage' 
            component={LandingScreen}
            options={{
            }}
          />
          <Stack.Screen
            name='CoreNavigation'
            component={CoreNavigation}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
