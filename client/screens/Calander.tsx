import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker"; 
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Calander() {
  const [showDatePickerVisibility, setDatePickerVisibility] = useState(false);
  const [date,setDate] = useState('')

  const HandleConfirmDate = (date: any) => {
    let time : string = ""
    setDatePickerVisibility(false);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if (dd < 10) {
    dd = '0' + dd;
    }
    if (mm < 10) {
    mm = '0' + mm;
    }
    time = `${yyyy}-${mm}-${dd}`
    setDate(time);
    console.log(date);
    }
    

  return (
    <ScrollView>
      <SafeAreaView>
        <View>
          <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
            <Text>Click Me</Text>
          </TouchableOpacity>
        </View>
        <View>
        <DateTimePickerModal
          isVisible={showDatePickerVisibility}
          mode="date"
          onConfirm={HandleConfirmDate}
          onCancel={() => { console.log("onCancel Date"); }} />
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})