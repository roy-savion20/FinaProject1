import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from '../components/NavBar';





export default function HomePage() {
  return (
    <SafeAreaView>
      <NavBar/>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({})