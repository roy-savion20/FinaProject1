import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export default function Bording2() {
    const navigation = useNavigation()
  return (
    <SafeAreaView>
        <View>
            <Image
            source={(require('../assets/2.png'))}
            style={styles.mainImage}
            />
        </View>
        <View style={styles.circlecontainer}>
            <View style={styles.dogdiv}>
                <TouchableOpacity onPress={() => navigation.navigate('SignUpTrainer')} style={styles.link}>
                    <Text style={styles.textdot}>Trainer</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('SignUpCostumer')} style={styles.link}>
                <View style={styles.dogdiv}>
                    <Text style={styles.textdot}>Dog Owner</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.dotcontainer}>
            <View style={styles.dot1}></View>
            <View style={styles.dot2}></View>
            <View style={styles.dot3}></View>
            <View style={styles.dot3}></View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    dot1:{
        width:25,
        height:25,
        backgroundColor:'#63E381',
        borderRadius: 100,
    },
    dot2:{
        width:25,
        height:25,
        backgroundColor:'#024738',
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
    dotcontainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 250,
        width: 150,
        margin:'auto'
    },
    mainImage:{
        height:300,
        width:400,
        borderRadius:20,
        margin:'auto',
        marginTop: 50
    },
    dogdiv:{
        height: 150,
        width: 150,
        backgroundColor:'rgba(7,140,101,0.6)',
        borderRadius: 100
    },
    circlecontainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 40,
        marginLeft: 40
    },
    textdot:{
        textAlign: 'center',
        fontSize: 24,
        margin: 'auto'
    },
    link:{
        margin: 'auto',
    }
})