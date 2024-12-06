import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import HomeScreen from './HomeScreen'; // Import the HomeScreen component
import DetailedRepoView from './DetailedRepoView'; // Import the DetailedRepoView component
import NotFoundScreen from './+not-found'; // Import the NotFoundScreen component
import HomeScreen from './(tabs)/HomeScreen';

const Stack = createNativeStackNavigator();


// Prevent the splash screen from auto-hiding before asset loading is complete.
//SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DetailedRepoView" component={DetailedRepoView} options={{ title: 'Repository Details' }} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} />
        </Stack.Navigator>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}