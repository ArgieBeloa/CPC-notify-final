import { useColorScheme } from '../hooks/useColorScheme';
// import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

  //import para ka pasa value sa Home tsx file

import { UserProvider } from '../src/userContext'; // ✅ import context

export default function RootLayout() {
  const colorScheme = useColorScheme();
  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  //   FunnelSans: require('../assets/fonts/FunnelSans-Regular.ttf'),
  //    Inter_400Regular,
  //   Inter_700Bold,
    
 
  // });

  // if (!loaded) {
  //   // Async font loading only occurs in development.
  //   return null;
  // }

  return (

  // wrap the child element  para ka pasa value sa Home tsx file
    <UserProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="eventAnnouncer" options={{ headerShown: false }} />
        <Stack.Screen name="Officer" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="EventDetails" options={{ headerShown: false }} />
 
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </UserProvider>
  );
}
