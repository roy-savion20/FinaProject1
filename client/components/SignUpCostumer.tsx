import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Button } from 'react-native';
import React, { useState, useRef, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFormik } from 'formik';
import { CoustumerType } from '../types/coustumer_type';
import CameraComponent from './Camera';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, useCameraPermissions, CameraProps } from 'expo-camera';
import requestCameraPermissionsAsync from 'expo-camera';

import { AdvancedImage } from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen";
const cld = new Cloudinary({
  cloud: {
    cloudName: 'demo'
  }
});

import { CoustumerContext } from '../context/CoustumerContextProvider';

export default function SignUpCustomer() {

  const {setCurrentCoustumer} = useContext<any>(CoustumerContext);

  // Use the image with public ID, 'picture'.
  const myImage = cld.image('picture');

  const navigation = useNavigation();
  const [isFocus, setIsFocus] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const data = [{ label: '0 - 2 years', value: '1' }, { label: '2 - 4 years', value: '2' }, { label: '4 - 6 years', value: '3' }, { label: '6 - 8 years', value: '4' }, { label: '8 - 10 years', value: '5' }, { label: '10 - 12 years', value: '6' }, { label: '12 + years', value: '7' }];

  const [galleryImg, setGalleryImg] = useState<string[]>([]);
  const [cameraOpen, setCameraOpen] = useState(false);


  const togglePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setGalleryImg([...galleryImg, result.assets[0].uri]);
      formik.setFieldValue('image', result.assets[0].uri);
      return result.assets[0].uri;
    }
  };


  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      dob: '',
      location: '',
      image: '',
      phone: '',
      update_details: '',
      clientType: '2'
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
      } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(values.email)) {
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
        if (age < 16 || age > 120) {
          errors.dob = 'Age must be between 16 and 120 years';
        }
      }

      if (!values.location) {
        errors.location = 'Required';
      } else if (values.location.length < 2) {
        errors.location = 'Location must be at least 2 characters';
      }

      if (!values.image) {
        errors.image = 'Required';
      }

      if (!values.phone) {
        errors.phone = 'Required';
      } else if (!/^05\d-\d{7}$/.test(values.phone)) {
        errors.phone = 'Phone number must be in the format 05X-XXXXXXX';
      }

      if (values.phone.length == 3) {
        values.phone += '-';
        console.log('values.phone', values.phone)
      }

      if (!values.update_details) {
        errors.update_details = 'Required';
      }

      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      const NewUser: Partial<CoustumerType> = values;
      console.log(values);
      resetForm();
      if (NewUser.email !== '') {
        setCurrentCoustumer(NewUser);
        navigation.navigate("Payment");
      }
    }
  });

  // expo calender - אולי יפתור את עיניין בחירת התאריך לידה
  const onDateChange = (event: Event, selectedDate: Date) => {
    if (event.type === "set") {
      const currentDate = selectedDate || new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
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

        {/* TOMTOM - ספרייה אשר אמורה להשלים אוטומטי את הכתובת */}
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

        {/*באתרי קורסים אצל יעל שיעור מספר 6 ו8 סוגר את הפינה של מצלמה והעלת תמונות */}
        <View style={styles.buttonContainer}>
          <View style={styles.buttonNext}>
            <TouchableOpacity onPress={pickImage} style={styles.link}>
              <Text style={styles.TextButton}>Pick Image</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonNext}>
            <TouchableOpacity onPress={() => setCameraOpen(true)} style={styles.link}>
              <Text style={styles.TextButton}>Open Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
        {cameraOpen && <CameraComponent />}
        <View style={styles.dateInput}>
          <Text style={styles.dateText}>
            {formik.values.image ? formik.values.image : "Select Your Image"}
          </Text>
        </View>
        <Image source={{ uri: formik.values.image }} style={styles.imageStyle} />
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

        <TextInput
          style={styles.input}
          placeholder="Enter Update Details"
          onChangeText={formik.handleChange('update_details')}
          onBlur={formik.handleBlur('update_details')}
          value={formik.values.update_details}
        />
        {formik.touched.update_details && formik.errors.update_details ? (
          <Text style={styles.error}>{formik.errors.update_details}</Text>
        ) : null}

        <View style={styles.buttonNext}>
          <TouchableOpacity onPress={() => formik.handleSubmit()} style={styles.link}>
            <Text style={styles.TextButton}>Next</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dotcontainer}>
          <View style={styles.dot1}></View>
          <View style={styles.dot2}></View>
          <View style={styles.dot3}></View>
          <View style={styles.dot4}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  imageStyle: {
    width: 250,
    aspectRatio: 4 / 3,
  },
  safeArea: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row"
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
  camera: {
    flex: 1,
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
    borderColor: 'rgba(255,159,71,0.8)',
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
  cameraContainer: {
    justifyContent: 'space-around'
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