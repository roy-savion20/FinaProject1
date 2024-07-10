import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Bording1 from './components/Bording1';
import { createStackNavigator } from '@react-navigation/stack';
import Bording2 from './components/Bording2';
import SignUpCostumer from './components/SignUpCostumer';
import SignUpTrainer from './components/SignUpTrainer';
import Payment from './components/Payment';
import HomePage from './screens/HomePage';
import TrainerContextProvider from './context/TrainerContextProvider';
import Profile from './screens/Profile';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Chat from './components/Chat';
import Settings from './screens/Settings';
import allCostumers from './screens/allCostumers';
import LogIn from './screens/LogIn';
import Calanders from './screens/Calanders';
import Posts from './screens/Posts';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

 function Back() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomePage" component={HomePage} options={{tabBarLabel: 'Home',
            headerShown: false,
            tabBarIcon: () => <MaterialCommunityIcons name='home' size={35} color='rgba(255,159,71,1)'/>
        }} />
      <Tab.Screen name="Profile" component={Profile}  options={{tabBarLabel: 'Profile',
            headerShown: true,
            tabBarIcon: () => <MaterialCommunityIcons name='account' size={35} color='rgba(255,159,71,1)'/>
        }} />
        <Tab.Screen name="Chat" component={Chat}  options={{tabBarLabel: 'Chat',
            headerShown: false,
            tabBarIcon: () => <MaterialCommunityIcons name='wechat' size={35} color='rgba(255,159,71,1)'/>
        }} />
          <Tab.Screen name="Settings" component={Settings}  options={{tabBarLabel: 'Settings',
            headerShown: false,
            tabBarIcon: () => <Feather name="settings" size={24} color="rgba(255,159,71,1)" />
        }} />
    </Tab.Navigator>
  );
}

function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Bording1" component={Bording1} options={{ headerShown: false }} />
      <Stack.Screen name="Bording2" component={Bording2} options={{ headerShown: false }} />
      <Stack.Screen name="SignUpCostumer" component={SignUpCostumer} options={{ headerShown: false }} />
      <Stack.Screen name="SignUpTrainer" component={SignUpTrainer} options={{ headerShown: false }} />
      <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
      <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
      <Stack.Screen name="allCostumers" component={allCostumers} options={{ headerShown: true }} />
      <Stack.Screen name="Calander" component={Calanders} options={{ headerShown: true }} />
      <Stack.Screen name="Posts" component={Posts} options={{ headerShown: true }} />
      <Stack.Screen name="Back" component={Back} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <TrainerContextProvider>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </TrainerContextProvider>
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
