import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Bording1 from './components/Bording1';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Bording2 from './components/Bording2';
import SignUpCostumer from './components/SignUpCostumer';
import SignUpTrainer from './components/SignUpTrainer';
import Payment from './components/Payment';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomePage from './screens/HomePage';




const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Bording1'component={Bording1} options={{headerShown : false}}/>
      <Stack.Screen name='Bording2'component={Bording2} options={{headerShown : false}}/>
      <Stack.Screen name='SignUpCostumer'component={SignUpCostumer} options={{headerShown : false}}/>
      <Stack.Screen name='SignUpTrainer'component={SignUpTrainer} options={{headerShown : false}}/>
      <Stack.Screen name='Payment'component={Payment} options={{headerShown : false}}/>
      <Stack.Screen name='HomePage'component={HomePage} options={{headerShown : false}}/>
    </Stack.Navigator>
  );
}



export default function App(){
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='StackNav' component={StackNav} options={{ tabBarButton: () => null }}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
