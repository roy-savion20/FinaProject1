import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { TrainerContext } from '../context/TrainerContextProvider';
import { TrainerType } from '../types/trainer_type';
import { useFormik } from 'formik';



export default function SignUpTrainer() {
  const navigation = useNavigation();
  const { AddTrainer } = useContext(TrainerContext);
  const [isFocus, setIsFocus] = useState(false);
  const [visiblePassword, setvisiblePassword] = useState(false);
  const data = [{ label: '0 - 2 years', value: '1' }, { label: '2 - 4 years', value: '2' }, { label: '4 - 6 years', value: '3' }, { label: '6 - 8 years', value: '4' }, { label: '8 - 10 years', value: '5' }, { label: '10 - 12 years', value: '6' }, { label: '12 + years', value: '7' }];

  const togglePasswordVisibility = () => {
    setvisiblePassword(!visiblePassword);
  };
 
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      location: '',
      experiance: '',
      password: ''
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.name) errors.name = 'Required';
      if (!values.email) errors.email = 'Required';
      if (!values.location) errors.location = 'Required';
      if (!values.experiance) errors.experiance = 'Required';
      if (!values.password) errors.password = 'Required';
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      const success: Partial<TrainerType> = (values as Partial<TrainerType>);
      console.log(success);
      resetForm();
      if (success.email) {
        navigation.navigate("Payment", {success});
      }
    }
  })
  return (
    <>
      <SafeAreaView>
        <View>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwz_L0tKaK7Ni3mvOkA7uGfvbe2yesmHV5fQ&s' }}
            style={styles.mainImage}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Full Name"
          onChangeText={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <Text style={styles.error}>{formik.errors.name}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Enter Your Password"
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          value={formik.values.password}
          secureTextEntry={!visiblePassword}
        />
        {formik.touched.password && formik.errors.password ? (
          <Text style={styles.error}>{formik.errors.password}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.toggleButton}
          onPress={togglePasswordVisibility}
        >
          <Image
            source={{ uri: visiblePassword ? 'https://icon2.cleanpng.com/20180424/pxq/kisspng-computer-icons-cross-eye-5adf65ca6e96c2.927735901524590026453.jpg' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_KjU4cWc-z6DWOwvoC06bAS_wA4MzgIQJiw&s' }}
            style={styles.check}
          />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <Text style={styles.error}>{formik.errors.email}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Enter Your Location"
          onChangeText={formik.handleChange('location')}
          onBlur={formik.handleBlur('location')}
          value={formik.values.location}
        />
        {formik.touched.location && formik.errors.location ? (
          <Text style={styles.error}>{formik.errors.location}</Text>
        ) : null}

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
          placeholder={!isFocus ? 'Experience' : '...'}
          searchPlaceholder="Search..."
          value={formik.values.experiance}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            formik.setFieldValue('experiance', item.value);
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
        {formik.touched.experiance && formik.errors.experiance ? (
          <Text style={styles.error}>{formik.errors.experiance}</Text>
        ) : null}

        <View style={styles.buttonNext}>
          <TouchableOpacity onPress={() => formik.handleSubmit} style={styles.link}>
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
    </>
  )
}

const styles = StyleSheet.create({
  mainImage: {
    height: 200,
    width: 300,
    borderRadius: 20,
    margin: 'auto',
    marginTop: 50
  },
  form: {
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
    marginTop: 10,
    width: 300,
    margin: 'auto',
    borderRadius: 15,
    marginBottom: 5
  },
  toggleButton: {
    marginLeft: 10
  },
  toggleButtonText: {
    width: 170,
    height: 30,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    margin: 'auto'
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
  },
  check: {
    width: 20,
    height: 20,
    marginTop: 15,
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
  dot1: {
    width: 25,
    height: 25,
    backgroundColor: 'rgba(255,159,71,0.4)',
    borderRadius: 100,
  },
  dot2: {
    width: 25,
    height: 25,
    backgroundColor: 'rgba(255,159,71,0.4)',
    borderRadius: 100,
  },
  dot3: {
    width: 25,
    height: 25,
    backgroundColor: 'rgba(255,159,71,1)',
    borderRadius: 100,
  },
  dot4: {
    width: 25,
    height: 25,
    backgroundColor: 'rgba(255,159,71,0.4)',
    borderRadius: 100,
  },
  dotcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
    width: 150,
    margin: 'auto'
  },
  buttonNext: {
    backgroundColor: 'rgba(255,159,71,0.4)',
    width: '40%',
    height: 50,
    margin: 'auto',
    borderRadius: 15,
    marginTop: 30
  },
  TextButton: {
    fontSize: 25,
    textAlign: 'center',
    margin: 'auto',
  },
  link: {
    height: 50
  },
})


 // לעבוד עם ה useFormik

  // <Formik
  //   initialValues={{
  //     name: '',
  //     email: '',
  //     location: '',
  //     experiance: '',
  //     password: ''
  //   }}
  //   validate={(values) => {
  //     const errors: any = {};
  //     if (!values.name) errors.name = 'Required';
  //     if (!values.email) errors.email = 'Required';
  //     if (!values.location) errors.location = 'Required';
  //     if (!values.experiance) errors.experiance = 'Required';
  //     if (!values.password) errors.password = 'Required';
  //     return errors;
  //   }}
  //   onSubmit={(values, { resetForm }) => {
  //     const success = AddTrainer(values as TrainerType);
  //     if (success) {
  //       resetForm();
  //       navigation.navigate('Payment');
  //     }
  //   }}
  // >
  // {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => ()}