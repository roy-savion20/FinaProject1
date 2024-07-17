import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';

export default function Settings() {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <SafeAreaView>
        <View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Update Info')}>
              <Text>
                Update Info
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Update Payment')}>
              <Text>
                Update Payment Method
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Mambership')}>
              <Text>
                Membership Details
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})