import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function SignUpTrainer() {
  const navigation = useNavigation()
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [city, setcity] = useState('')
  const [experiance, setexperiance] = useState('')
  const [password,setPassword] = useState('')
  const [visibalePassword,setvisibalePassword] = useState(false)
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState<string>('');
  const data = [ { label: '0 - 2 years', value: '1' }, { label: '2 - 4 years', value: '2' }, { label: '4 - 6 years', value: '3' }, { label: '6 - 8 years', value: '4' }, { label: '8 - 10 years', value: '5' }, { label: '10 - 12 years', value: '6' }, { label: '12 + years', value: '7' } ];

  const togglePasswordVisibility = () => {
    setvisibalePassword(!visibalePassword);
  };

  return (
    <SafeAreaView>
      <View>
        <Image
          source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwz_L0tKaK7Ni3mvOkA7uGfvbe2yesmHV5fQ&s'}}
          style={styles.mainImage}
          />
      </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Full Name"
          value={name}
          onChangeText={setname}
        />
              <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!visibalePassword}
        />
    </View>
    <TouchableOpacity
          style={styles.toggleButton}
          onPress={togglePasswordVisibility}
          >
            <View>
                <View>
                {
                  visibalePassword ? <Image
                  source={{uri: 'https://icon2.cleanpng.com/20180424/pxq/kisspng-computer-icons-cross-eye-5adf65ca6e96c2.927735901524590026453.jpg'}}
                  style={styles.check} />
                  : <Image
                  source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_KjU4cWc-z6DWOwvoC06bAS_wA4MzgIQJiw&s'}}
                  style={styles.check} />
                }
                </View>
            </View>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Emaal"
          value={email}
          onChangeText={setemail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Location"
          value={city}
          onChangeText={setcity}
        />

        <View style={styles.buttonNext}>
            <TouchableOpacity onPress={() => navigation.navigate('Payment')} style={styles.link}>
                <Text style={styles.TextButton}>Next</Text>
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
form:{
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-around',
  margin: 'auto'
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
toggleButton: {
  marginLeft: 10,
},
toggleButtonText: {
  width: 170,
  height:30,
  marginTop: 10,
  textAlign:'center',
  fontSize: 18,
  margin: 'auto'
  
},
check:{
  width: 30,
  height: 30,
  marginTop: 35,
},
dropdown: {
  height: 40,
  borderColor: 'rgba(255,159,71,0.8)',
  borderWidth: 0.5,
  borderRadius: 8,
  paddingHorizontal: 8,
  width: 300,
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
    backgroundColor:'rgba(255,159,71,1)',
    borderRadius: 100,
},
dot4:{
    width:25,
    height:25,
    backgroundColor:'rgba(255,159,71,0.4)',
    borderRadius: 100,
},
dotcontainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
    width: 150,
    margin:'auto'
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
  fontSize:25,
  textAlign:'center',
  margin:'auto',
},
link:{
  height:50
},
})