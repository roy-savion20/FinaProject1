import { View, Text,StyleSheet,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';



export default function Bording1() {
    const navigation = useNavigation()
   

  return (
    <SafeAreaView style={styles.safeArea}>
        <View>
            <Image
            source={(require('../assets/2.png'))}
            style={styles.mainImage}
            />
        </View>
        <View style={styles.container}>
            <Text style={styles.textTitle}>Welcome To DogHouse</Text>
        </View>
        <View>
            <Text style={styles.DogDesc}>Get Your Job Easier</Text>
            <Text style={styles.or}>OR</Text>
            <Text style={styles.DogDesc}>Get Your Dog Trainer</Text>
        </View>
        <View style={styles.buttonContainer}>
            <View style={styles.buttonNext}>
                <TouchableOpacity onPress={() => navigation.navigate('Bording2')} style={styles.link}>
                    <Text style={styles.TextButton}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonNext}>
                <TouchableOpacity onPress={() => navigation.navigate('LogIn')} style={styles.link}>
                    <Text style={styles.TextButton}>Log In</Text>
                </TouchableOpacity>
            </View>
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
    textTitle:{
        textAlign:'center',
        fontSize:30,
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
      },
      container: {
        alignItems: 'center',
        marginTop: 30
      },
      mainImage:{
        height:300,
        width:400,
        borderRadius:20,
        margin:'auto',
        marginTop: 50
    },
    buttonNext:{
        backgroundColor:'rgba(29,189,123,0.7)',
        width: '40%',
        height: 50,
        margin:'auto',
        borderRadius: 15,
        marginTop: 30
    },
    TextButton:{
        fontSize:25,
        textAlign:'center',
        margin:'auto'
    },
    arrow:{
        height:30,
        width: 30,
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
        backgroundColor:'#024738',
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
        backgroundColor:'#63E381',
        borderRadius: 100,
    },
    link:{
        height:50
    },
    DogDesc:{
        textAlign:'center',
        marginTop: 20,
        fontSize:24,
        fontWeight: '500'
    },
    or:{
        textAlign:'center',
        marginTop: 20,
        fontSize:32,
        fontWeight: 'bold',
    },
    buttonContainer:{
        flexDirection: "row"
    }
  });




    
    
    
    
    
