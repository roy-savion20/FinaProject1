import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { TrainerContext } from '../context/TrainerContextProvider';
import { useFormik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TrainerType } from '../types/trainer_type';

export default function UpdateInfo() {
  const navigation = useNavigation();
  const { AddTrainer } = useContext(TrainerContext);
  const [isFocus, setIsFocus] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const data = [{ label: '0 - 2 years', value: '1' }, { label: '2 - 4 years', value: '2' }, { label: '4 - 6 years', value: '3' }, { label: '6 - 8 years', value: '4' }, { label: '8 - 10 years', value: '5' }, { label: '10 - 12 years', value: '6' }, { label: '12 + years', value: '7' }];

  const togglePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      dob: '',
      location: '',
      experience: '',
      image: '',
      phone: '',
      clientType: '1'
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.first_name) {
        errors.first_name = 'Required';
      } else if (values.first_name.length < 2) {
        errors.first_name = 'First name must be at least 2 characters';
      } else if (values.first_name.length > 25) {
        errors.first_name = 'First name must be less than 25 characters';
      }

      if (!values.last_name) {
        errors.last_name = 'Required';
      } else if (values.last_name.length < 2) {
        errors.last_name = 'Last name must be at least 2 characters';
      } else if (values.last_name.length > 25) {
        errors.last_name = 'Last name must be less than 25 characters';
      }

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email format';
      } // בודק שהכתובת שהוזמנה נרשמה אך ורק באנגלית
       else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(values.email)) {
        errors.email = 'Email must be in English';
      }


      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }

      if (!values.dob) {
        errors.dob = 'Required';
      } else {
        const today = new Date();
        const birthDate = new Date(values.dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age < 18 || age > 100) {
          errors.dob = 'Age must be between 18 and 100 years';
        }
      }

      if (!values.location) {
        errors.location = 'Required';
      } else if (values.location.length < 2) {
        errors.location = 'Location must be at least 2 characters';
      }

      if (!values.experience) {
        errors.experience = 'Required';
      } else if (isNaN(Number(values.experience))) {
        errors.experience = 'Experience must be a number';
      }

      if (!values.image) {
        errors.image = 'Required';
      }

      if (!values.phone) {
        errors.phone = 'Required';
      } else if (!/^05\d-\d{7}$/.test(values.phone)) {
        errors.phone = 'Phone number must be in the format 05X-XXXXXXX';
      }

      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      const NewUser: Partial<TrainerType> = values;
      console.log(values);
      resetForm();
      if (NewUser.email !== '') {
        navigation.navigate("Payment", { NewUser });
      }
    }
  });

  const onDateChange = (event: Event, selectedDate: Date) => {
    if (event.type === "set") {
      const currentDate = selectedDate || new Date();
      const formattedDate = currentDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      formik.setFieldValue('dob', formattedDate);
    }
    setShowDatePicker(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View>
          <Image
            source={(require('../assets/2.png'))}
            style={styles.mainImage}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter Your First Name"
          onChangeText={formik.handleChange('first_name')}
          onBlur={formik.handleBlur('first_name')}
          value={formik.values.first_name}
        />
        {formik.touched.first_name && formik.errors.first_name ? (
          <Text style={styles.error}>{formik.errors.first_name}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Enter Your Last Name"
          onChangeText={formik.handleChange('last_name')}
          onBlur={formik.handleBlur('last_name')}
          value={formik.values.last_name}
        />
        {formik.touched.last_name && formik.errors.last_name ? (
          <Text style={styles.error}>{formik.errors.last_name}</Text>
        ) : null}

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

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Enter Your Password"
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            value={formik.values.password}
            secureTextEntry={!visiblePassword}
          />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={togglePasswordVisibility}
          >
            <Image
              source={{ uri: visiblePassword ? 'https://icon2.cleanpng.com/20180424/pxq/kisspng-computer-icons-cross-eye-5adf65ca6e96c2.927735901524590026453.jpg' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_KjU4cWc-z6DWOwvoC06bAS_wA4MzgIQJiw&s' }}
              style={styles.check}
            />
          </TouchableOpacity>
        </View>
        {formik.touched.password && formik.errors.password ? (
          <Text style={styles.error}>{formik.errors.password}</Text>
        ) : null}

        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
          <Text style={styles.dateText}>
            {formik.values.dob ? formik.values.dob : "Select Your Date of Birth"}
          </Text>
        </TouchableOpacity>
        {formik.touched.dob && formik.errors.dob ? (
          <Text style={styles.error}>{formik.errors.dob}</Text>
        ) : null}
        {showDatePicker && (
          <DateTimePicker
            value={formik.values.dob ? new Date(formik.values.dob) : new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

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

        <TextInput
          style={styles.input}
          placeholder="Enter Your Image URL"
          onChangeText={formik.handleChange('image')}
          onBlur={formik.handleBlur('image')}
          value={formik.values.image}
        />
        {formik.touched.image && formik.errors.image ? (
          <Text style={styles.error}>{formik.errors.image}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Enter Your Phone Number"
          onChangeText={formik.handleChange('phone')}
          onBlur={formik.handleBlur('phone')}
          value={formik.values.phone}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <Text style={styles.error}>{formik.errors.phone}</Text>
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
          value={formik.values.experience}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            formik.setFieldValue('experience', item.value);
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
        {formik.touched.experience && formik.errors.experience ? (
          <Text style={styles.error}>{formik.errors.experience}</Text>
        ) : null}

        <View style={styles.buttonNext}>
          <TouchableOpacity onPress={() => formik.handleSubmit()} style={styles.link}>
            <Text style={styles.TextButton}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  mainImage: {
    height: 220,
    width: 300,
    borderRadius: 20,
    marginTop: 50
  },
  form: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    height: 40,
    borderColor: 'rgba(2,71,56,0.8)',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginTop: 15,
    width: 300,
    borderRadius: 15,
    marginBottom: 5
  },
  dateInput: {
    height: 40,
    borderColor: 'rgba(2,71,56,0.8)',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginTop: 15,
    width: 300,
    borderRadius: 15,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(2,71,56,0.8)',
    borderWidth: 1,
    borderRadius: 15,
    width: 300,
    marginTop: 15,
    paddingHorizontal: 8,
  },
  inputPassword: {
    flex: 1,
    height: 40,
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
  },
  dropdown: {
    height: 40,
    borderColor: 'rgba(2,71,56,0.8)',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 300,
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
    backgroundColor: '#63E381',
    borderRadius: 100,
  },
  dot2: {
    width: 25,
    height: 25,
    backgroundColor: '#63E381',
    borderRadius: 100,
  },
  dot3: {
    width: 25,
    height: 25,
    backgroundColor: '#024738',
    borderRadius: 100,
  },
  dot4: {
    width: 25,
    height: 25,
    backgroundColor: '#63E381',
    borderRadius: 100,
  },
  dotcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
    width: 150,
  },
  buttonNext: {
    backgroundColor: 'rgba(7,140,101,0.6)',
    width: '40%',
    height: 50,
    borderRadius: 15,
    marginTop: 30,
  },
  TextButton: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
  },
  link: {
    height: 50
  },
});
