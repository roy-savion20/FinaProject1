import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useFormik } from 'formik';

export default function LogIn() {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const togglePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
      return errors;
    },

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      console.log(formik.errors)
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwz_L0tKaK7Ni3mvOkA7uGfvbe2yesmHV5fQ&s' }}
            style={styles.mainImage}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ?
          <Text style={styles.error}>{formik.errors.email}</Text>
          : null}

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
        <View style={styles.buttonNext}>
          <TouchableOpacity onPress={() => formik.handleSubmit()} style={styles.link}>
            <Text style={styles.TextButton}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
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
    height: 200,
    width: 300,
    borderRadius: 20,
    marginTop: 50
  },
  form: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input: {
    height: 40,
    borderColor: 'rgba(255,159,71,0.8)',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginTop: 35,
    width: 300,
    borderRadius: 15,
    marginBottom: 5
  },
  dateInput: {
    height: 40,
    borderColor: 'rgba(255,159,71,0.8)',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginTop: 10,
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
    borderColor: 'rgba(255,159,71,0.8)',
    borderWidth: 1,
    borderRadius: 15,
    width: 300,
    marginTop: 10,
    paddingHorizontal: 8,
  },
  inputPassword: {
    flex: 1,
    height: 40,
  },
  toggleButton: {
    marginLeft: 10,

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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
    width: 150,
  },
  buttonNext: {
    backgroundColor: 'rgba(255,159,71,0.4)',
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