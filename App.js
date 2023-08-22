import 'react-native-gesture-handler';
import { useCallback, useEffect } from 'react';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import MainNavigator from './components/MainNavigator';
import { store } from './src/state/store';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Barlow-Regular' : require('./assets/fonts/Barlow-Regular.ttf'),
    'Barlow-Bold' : require('./assets/fonts/Barlow-Bold.ttf'),
    'Barlow-Light' : require('./assets/fonts/Barlow-Light.ttf'),
  });


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    onLayoutRootView()
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
