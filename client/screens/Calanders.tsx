import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function Calanders() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleDatePress = (date: DateObject) => {
    setSelectedDate(date.dateString);
    setDatePickerVisibility(true);
  };

  const handleConfirm = (time: Date) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    setSelectedTime(`${hours}:${minutes < 10 ? `0${minutes}` : minutes}`);
    setDatePickerVisibility(false);
  };

  const handleCancel = () => {
    setDatePickerVisibility(false);
  };

  return (
    <ScrollView>
      <View>
        <Text style={styles.texthead}>Choose When You Want To Work</Text>
      </View>
      <Image
            source={(require('../assets/2.png'))}
            style={styles.mainImage}
      />
      <View style={styles.container}>
        <Calendar
          onDayPress={handleDatePress}
          markedDates={{
            [selectedDate as string]: { selected: true, marked: true }
          }}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
        {selectedDate && selectedTime && (
          <Text style={styles.selectedText}>
            Selected: {selectedDate} at {selectedTime}
          </Text>
        )}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 50
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  texthead:{
    textAlign:'center',
    marginTop: 70,
    fontSize: 24,
    fontWeight: 'bold'
  },
  submit:{
    backgroundColor: 'rgba(255,159,71,0.8)',
    height: 50,
    width: 100,
    margin: 'auto',
    marginTop : 30,
    borderRadius: 10
  },
  textbutton:{
    textAlign: 'center',
    margin: 'auto',
    fontSize: 18,
    fontWeight: 'bold'
  },
  mainImage:{
    height:300,
    width:400,
    borderRadius:20,
    margin:'auto',
    marginTop: 50
},
});

