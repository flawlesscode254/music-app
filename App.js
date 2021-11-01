import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/Music'
import PlayScreen from './screens/Play';
import ProfileScreen from './screens/Profile'

const Stack = createBottomTabNavigator();

const App = () => {

  const tabBarOptions = {
    showLabel: false,
    style: {
        backgroundColor: "#0E2A47",
        paddingBottom: 12,
        paddingTop: 12
    }
}

const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused }) => {
        let iconName = "home"
        switch (route.name) {
            case "Home":
                iconName = "home"
                break;
            case "Play":
                iconName = "musical-notes"
                break;
            case "Profile":
                iconName = "heart"
                break;

            default:
                iconName = "home"
        }

        return <Ionicons name={iconName} size={24} color={focused ? "#ffffff" : "#666666"} />
    }
  })
  return (
    <NavigationContainer>
      <Stack.Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
        <Stack.Screen name="Music" component={HomeScreen} />
        <Stack.Screen name="Play" component={PlayScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App
