import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FlashMessage from 'react-native-flash-message'
import GeminiChat from '../screens/GeminiChat'

export default function Chat() {
  return (
    <View>
      <GeminiChat/>
      <FlashMessage position={"top"} />
    </View>
  )
}

const styles = StyleSheet.create({})