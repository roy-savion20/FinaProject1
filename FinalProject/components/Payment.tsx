import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function Payment() {
  const navigation = useNavigation()
  const [card,setcard] = useState('');
  const [date,setDate] = useState('');
  const [ccv,setccv] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState<string>('');
  const data = [ { label: '2024', value: '2024' }, { label: '2025', value: '2025' }, { label: '2026', value: '2026' }, { label: '2027', value: '2027' }, { label: '2028', value: '2028' }, { label: '2029', value: '2029' }, { label: '2030', value: '2030' } ];
  const data1 = [ { label: '01', value: '1' }, { label: '02', value: '2' }, { label: '03', value: '3' }, { label: '04', value: '4' }, { label: '05', value: '5' }, { label: '06', value: '6' }, { label: '08', value: '8' }, { label: '09', value: '9' }, { label: '10', value: '10' }, { label: '11', value: '11' }, { label: '12', value: '12' } ];

  return (
    <SafeAreaView>
      <View>
            <Image
            source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwz_L0tKaK7Ni3mvOkA7uGfvbe2yesmHV5fQ&s'}}
            style={styles.mainImage}
            />
      </View>
      <View>
        <Text style={styles.textTitle}>Choose Your Payment Method</Text>
      </View>
      <View>
      <TextInput
          style={styles.input}
          placeholder="Enter Your Card Number"
          value={card}
          onChangeText={setcard}
        />
        <View style={styles.datecontainer}>
        <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Year' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item=> {
              setValue(item.value);
              setIsFocus(false);
              }}
              renderLeftIcon={() => (
              <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
              />
              )}
              />
                              <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data1}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Monthe' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item=> {
              setValue(item.value);
              setIsFocus(false);
              }}
              renderLeftIcon={() => (
              <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
              />
              )}
              />
        </View>
      </View>
      <View style={styles.ccv}>
      <TextInput
          style={styles.input}
          placeholder="Enter Your CCV..."
          value={card}
          onChangeText={setcard}
        />
      </View>
      <View style={styles.buttonNext}>
            <TouchableOpacity onPress={() => navigation.navigate('HomePage')} style={styles.link}>
                <Text style={styles.TextButton}>Sign Up</Text>
            </TouchableOpacity>
      </View>
      <View style={styles.dotcontainer}>
        <View style={styles.dot1}></View>
        <View style={styles.dot2}></View>
        <View style={styles.dot3}></View>
        <View style={styles.dot4}></View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainImage:{
    height:200,
    width:300,
    borderRadius:20,
    margin:'auto',
    marginTop: 50
},
textTitle:{
  textAlign:'center',
  marginTop: 30,
  fontSize:20,
  fontFamily: 'Roboto-Regular'
},
input: {
  height: 40,
  borderColor: 'rgba(255,159,71,0.8)',
  borderWidth: 1,
  paddingHorizontal: 8,
  marginTop: 30,
  width: 300,
  margin: 'auto',
  borderRadius: 15
},
dropdown: {
  height: 40,
  borderColor: 'rgba(255,159,71,0.8)',
  borderWidth: 0.5,
  borderRadius: 8,
  paddingHorizontal: 8,
  width: 150,
  margin: 'auto',
  marginTop: 30
  },
  icon: {
  marginRight: 5,
  },
  label: {
  position: 'absolute',
  backgroundColor: 'white',
  left: 22,
  top: 8,
  zIndex: 999,
  paddingHorizontal: 8,
  fontSize: 14,
  },
  placeholderStyle: {
  fontSize: 16,
  },
  selectedTextStyle: {
  fontSize: 16,
  },
  iconStyle: {
  width: 20,
  height: 20,
  },
  inputSearchStyle: {
  height: 40,
  fontSize: 16,
  },
  datecontainer:{
    flex:1,
    flexDirection: 'row',
  },
  ccv:{
    marginTop: 80
  },

buttonNext:{
  backgroundColor:'rgba(255,159,71,0.4)',
  width: '40%',
  height: 50,
  margin:'auto',
  borderRadius: 15,
  marginTop: 30
},
TextButton:{
  fontSize:20,
  textAlign:'center',
  margin:'auto',
},
link:{
  height:50
},
dotcontainer:{
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 30,
  width: 150,
  margin:'auto'
},
dot1:{
  width:25,
  height:25,
  backgroundColor:'rgba(255,159,71,0.4)',
  borderRadius: 100,
},
dot2:{
  width:25,
  height:25,
  backgroundColor:'rgba(255,159,71,0.4)',
  borderRadius: 100,
},
dot3:{
  width:25,
  height:25,
  backgroundColor:'rgba(255,159,71,0.4)',
  borderRadius: 100,
},
dot4:{
  width:25,
  height:25,
  backgroundColor:'rgba(255,159,71,1)',
  borderRadius: 100,
},
})