import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Trainers from '../data/Trainers.json'
import { ScrollView } from 'react-native-gesture-handler'

export default function Costumer() {
  return (
    <ScrollView>
        <View>
            <View>
                <Text>{Trainers[0].first_name}</Text>
            </View>
            <View>
                <Text>{Trainers[0].last_name}</Text>
            </View>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})