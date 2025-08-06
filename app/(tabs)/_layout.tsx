import { Ionicons } from '@expo/vector-icons'; // ✅ import icons
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';

import { useFonts } from 'expo-font';
import { useColorScheme } from '../../hooks/useColorScheme';

import EventsScreen from './events'; // ✅ import EventsScreen
import HomeScreen from './home';
import ProfileScreen from './profile';
import RateScreen from './rate';

// Optional: If you're using TypeScript and have types
// import { RootTabParamList } from '../types'; 
// const Tabs = createBottomTabNavigator<RootTabParamList>();

// import color
import { COLORS } from '../../constants/ColorCpc';

const Tabs = createBottomTabNavigator(); // 👈 Works without type for JS too

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
  
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            // Customize if needed
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            switch (route.name) {
              case 'home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'events':
                iconName = focused ? 'calendar' : 'calendar-outline';
                break;
              case 'profile':
                iconName = focused ? 'person' : 'person-outline';
                break;
              case 'rate':
                iconName = focused ? 'person' : 'person-outline';
                break;
              default:
                iconName = 'help';
            }

            return <Ionicons name={iconName} size={24} color={focused ? COLORS.Primary : 'gray'} />;
          },
          tabBarActiveTintColor: COLORS.Primary,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tabs.Screen name="home" component={HomeScreen} options={{ title: 'Home' }} />
        <Tabs.Screen name="events" component={EventsScreen} options={{ title: 'Events' }} />
        <Tabs.Screen name="profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Tabs.Screen name="rate" component={RateScreen} options={{ title: 'Rate' }} />
      </Tabs.Navigator>

   

        );
}

        const styles = StyleSheet.create({
          safeAreaViewCotainer: {
          width: '100%',
        height: '100%',
  },
});
