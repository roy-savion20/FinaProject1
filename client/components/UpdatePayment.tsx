import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFormik } from 'formik';
import { TrainerContext } from '../context/TrainerContextProvider';
import { TrainerType } from '../types/trainer_type';
import { CoustumerType } from '../types/coustumer_type';



// # Connection for yuval - eMcWHJbuAdzLwDEf
export default function Payment(NewUser: any) {
  const { AddTrainer } = useContext(TrainerContext);
  const { AddCoustumer } = useContext(TrainerContext);
  const navigation = useNavigation();
  const route = useRoute();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState('');
  const data = [
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' },
    { label: '2026', value: '2026' },
    { label: '2027', value: '2027' },
    { label: '2028', value: '2028' },
    { label: '2029', value: '2029' },
    { label: '2030', value: '2030' },
  ];
  const data1 = [
    { label: '01', value: '01' },
    { label: '02', value: '02' },
    { label: '03', value: '03' },
    { label: '04', value: '04' },
    { label: '05', value: '05' },
    { label: '06', value: '06' },
    { label: '08', value: '08' },
    { label: '09', value: '09' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
  ];

  const formik = useFormik({
    initialValues: {
      card: '',
      month: '',
      year: '',
      cvv: '',
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.card) {
        errors.card = 'Required';
      } else if (!/^\d{16}$/.test(values.card)) {
        errors.card = 'Card number must be 16 digits';
      }

      if (!values.month) {
        errors.month = 'Required';
      } else if (!/^(0[1-9]|1[0-2])$/.test(values.month)) {
        errors.month = 'Month must be between 01 and 12';
      }

      if (!values.year) {
        errors.year = 'Required';
      } else if (!/^\d{4}$/.test(values.year)) {
        errors.year = 'Year must be 4 digits';
      }

      if (!values.cvv) {
        errors.cvv = 'Required';
      } else if (!/^\d{3}$/.test(values.cvv)) {
        errors.cvv = 'CVV must be 3 digits';
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      const payment: any = {
        card: values.card,
        date: values.year + '-' + values.month,
        cvv: values.cvv
      }
      // console.log('TrainerInfo:', JSON.stringify(TrainerInfo, null, 2)); // Updated to display values
      if (NewUser.clientType == '1') {
        console.log('TrainerInfo:', JSON.stringify(NewUser, null, 2)); // Updated to display values
        const NewTrainer: TrainerType = {
          first_name: NewUser.first_name,
          last_name: NewUser.last_name,
          email: NewUser.email,
          password: NewUser.password,
          dob: NewUser.dob,
          location: NewUser.location,
          experience: NewUser.experience,
          image: NewUser.image,
          phone: NewUser.phone,
          clientType: NewUser.clientType,
          payment: payment
        }
        AddTrainer(NewTrainer);
        console.log('New Trainer: ' + NewTrainer);
      }
      else if (NewUser.clientType == '2') {
        console.log('CustomerInfo:', JSON.stringify(NewUser, null, 2)); // Updated to display values
        const NewCustomer: CoustumerType = {
          first_name: NewUser.first_name,
          last_name: NewUser.last_name,
          email: NewUser.email,
          password: NewUser.password,
          dob: NewUser.dob,
          location: NewUser.location,
          image: NewUser.image,
          phone: NewUser.phone,
          clientType: NewUser.clientType,
          update_details:NewUser.update_details,
          payment: payment
        }
        AddCoustumer(NewCustomer);
        console.log('New Customer: ' + NewCustomer);
      }
      resetForm();
      if (payment.card) {
        navigation.navigate('BackToPre');
      }
    }
  });
  return (
    <>
      <SafeAreaView>
        <View>
          <Image
            source={(require('../assets/2.png'))}
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
            onChangeText={formik.handleChange('card')}
            onBlur={formik.handleBlur('card')}
            value={formik.values.card}
          />
          {formik.errors.card && formik.touched.card ? <Text style={styles.error}>{formik.errors.card}</Text> : null}
        </View>
        <View style={styles.datecontainer}>
          <View>
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
              value={formik.values.year}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                formik.setFieldValue('year', item.value);
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
            {formik.errors.year && formik.touched.year ?
              <Text style={styles.error}>{formik.errors.year}</Text>
              : null}
          </View>
          <View>
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
              placeholder={!isFocus ? 'Month' : '...'}
              searchPlaceholder="Search..."
              value={formik.values.month}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                formik.setFieldValue('month', item.value);
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
            {formik.touched.month && formik.errors.month ?
              <Text style={styles.error}>{formik.errors.month}</Text>
              : null}
          </View>
        </View>
        <View style={styles.cvv}>
          <TextInput
            style={styles.input}
            placeholder="Enter Your CVV..."
            onChangeText={formik.handleChange('cvv')}
            onBlur={formik.handleBlur('cvv')}
            value={formik.values.cvv ? formik.values.cvv.toString() : ''}
            keyboardType="numeric"
          />
          {formik.errors.cvv && formik.touched.cvv ? (
            <Text style={styles.error}>{formik.errors.cvv}</Text>
          ) : null}
        </View>
        <View style={styles.buttonNext}>
          <TouchableOpacity onPress={() => formik.handleSubmit()} style={styles.link}>
            <Text style={styles.TextButton}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  mainImage: {
    height: 220,
    width: 300,
    borderRadius: 20,
    margin: 'auto',
    marginTop: 50,
  },
  textTitle: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
  },
  input: {
    height: 40,
    borderColor: 'rgba(2,71,56,0.8)',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginTop: 30,
    width: 300,
    margin: 'auto',
    borderRadius: 15,
  },
  dropdown: {
    height: 40,
    borderColor: 'rgba(2,71,56,0.8)',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 150,
    margin: 'auto',
    marginTop: 30,
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
  datecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,

  },
  cvv: {
    marginTop: 10,
  },
  buttonNext: {
    backgroundColor: 'rgba(7,140,101,0.6)',
    width: '40%',
    height: 50,
    margin: 'auto',
    borderRadius: 15,
    marginTop: 30,
  },
  TextButton: {
    fontSize: 20,
    textAlign: 'center',
    margin: 'auto',
  },
  link: {
    height: 50,
  },
  dotcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    width: 150,
    margin: 'auto',
  },
    dot1:{
      width:25,
      height:25,
      backgroundColor:'#63E381',
      borderRadius: 100,
  },
  dot2:{
      width:25,
      height:25,
      backgroundColor:'#63E381',
      borderRadius: 100,
  },
  dot3:{
      width:25,
      height:25,
      backgroundColor:'#63E381',
      borderRadius: 100,
  },
  dot4:{
      width:25,
      height:25,
      backgroundColor:'#024738',
      borderRadius: 100,
  },
  error: {
    fontSize: 12,
    color: 'red',
    textAlign: 'center',
  },
});
