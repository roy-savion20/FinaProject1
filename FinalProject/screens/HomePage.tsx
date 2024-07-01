import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from '../components/NavBar';
import FlashMessage from 'react-native-flash-message';
import GeminiChat from './GeminiChat';





export default function HomePage() {
  return (
    <SafeAreaView>
      <NavBar/>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({})