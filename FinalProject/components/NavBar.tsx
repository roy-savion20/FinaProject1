import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomePage from '../screens/HomePage';
import Settings from '../screens/Settings';


const Tab = createBottomTabNavigator();
export default function NavBar() {
  return (
    <Tab.Navigator>
        <Tab.Screen name='Profile' component={Profile} 
        options={{tabBarLabel: 'Profile',
            tabBarIcon: () => <MaterialCommunityIcons name='account' size={35} color='rgba(255,159,71,1)'/>
        }}
        />
        <Tab.Screen name='HomePage' component={HomePage} 
        options={{tabBarLabel: 'Home',
            tabBarIcon: () => <MaterialCommunityIcons name='home' size={35} color='rgba(255,159,71,1)'/>
        }}
        />
        <Tab.Screen name='Settings' component={Settings} 
        options={{tabBarLabel: 'Settings',
            tabBarIcon: () => <MaterialCommunityIcons name='account-cog' size={35} color='rgba(255,159,71,1)'/>
        }}
        />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})