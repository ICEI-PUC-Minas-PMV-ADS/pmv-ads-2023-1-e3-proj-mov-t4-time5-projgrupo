import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native'

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';


import AuthScreen from './Auth/_layout';
import { AuthProvider } from './Auth/provider/AuthProvider';
import { SplashScreen } from './SplashScreen';

import { StorageService } from '../lib/services/StorageService';
import { DarkTheme, LightTheme, ThemeProvider } from '../lib/constants/Theme';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/',
};

export default function RootLayout() {
  const storage = StorageService();
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const toggleTheme = async () => {
    const themeValue = theme === 'dark' ? 'light' : 'dark';
    try {
      storage.set('theme', themeValue);
      setTheme(themeValue);
    } catch (error) {
      console.log(error);
    }
  };

  const getTheme = async () => {
    try {
      const themeValue = await storage.get('theme');
      //@ts-ignore
      if (themeValue) setTheme(themeValue);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTheme();
  }, [])

  return (
    <ThemeProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
      {!loaded ? <SplashScreen /> : (
        <AuthProvider>
          <AuthScreen>
            <RootLayoutNav />
          </AuthScreen>
        </AuthProvider>
      )}
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Profile" options={{ headerShown: false }} />
    </Stack>
  );
}
