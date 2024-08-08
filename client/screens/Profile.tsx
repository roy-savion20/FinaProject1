import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Trainers from '../data/Trainers.json'
import BarChart from 'react-native-chart-kit/dist/BarChart';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
export default function Profile() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Incomes',
      data: [2200, 2500, 2700, 3000, 2900, 3200],
      color: (opacity = 1) => `rgba(29,189,123, ${opacity})`, // green
    },
    {
      label: 'Outcomes',
      data: [2000, 2100, 2200, 2800, 2600, 3000],
      color: (opacity = 1) => `rgba(29,189,123, ${opacity})`, // red
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(2,71,56, ${opacity})`,
  barPercentage: 0.5,
};

  

  return (
    <SafeAreaView>
      <ScrollView>
      <View style={styles.Header}>
        <Text style={styles.profileName}> hello {Trainers[0].first_name} {Trainers[0].last_name}</Text>
        <Image 
        source={{uri: Trainers[0]?.image}}
        style={styles.profileImage}
        />
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity>
          <View style={styles.StatesContainer}>
            <Text style={styles.TextContainer}>Stats</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AllCostumers')}>
        <View style={styles.StatesContainer}>
            <Text style={styles.TextContainer}>costumers</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity onPress={() => navigation.navigate('Calander')}>
          <View style={styles.StatesContainer}>
            <Text style={styles.TextContainer}>Scheduals</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Posts')}>
        <View style={styles.StatesContainer}>
            <Text style={styles.TextContainer}>Posts</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.moneyContainer}>
        <View>
          <Text style={styles.textMoney}>Income</Text>
        </View>
        <View style={styles.Line}></View>
        <View>
          <Text style={styles.textMoney}>Outcome</Text>
        </View>
      </View>
      <View>
    </View>
    <View style={styles.CharContainer}>
      <BarChart
          data={data}
          width={screenWidth}
          height={290}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          yAxisLabel="$"
          showValuesOnTopOfBars
          fromZero
        />
    </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Header:{
    flexDirection: "row",
    justifyContent: "space-around"
  },
  profileName:{
    fontSize: 18,
    textAlign: "center",
    marginTop: 50
  },
  profileImage:{
    height: 130,
    width: 130,
    borderRadius: 70
  },
  StatesContainer:{
    backgroundColor: "rgba(29,189,123,0.6)",
    height: 130,
    width: 130,
    borderRadius: 20
  },
  containerButton:{
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop : 50
  }, 
  TextContainer:{
    textAlign: "center",
    margin: "auto",
    fontSize: 18
  },
  moneyContainer:{
    backgroundColor: "rgba(29,189,123,0.6)",
    flexDirection: "row",
    justifyContent: "space-around",
    height :70,
    width: "90%",
    margin: "auto",
    marginTop: 30
  },
  Line:{
    backgroundColor: "black",
    height: 70,
    width: 2
  },
  textMoney:{
    textAlign: "center",
    margin: "auto"
  },
  CharContainer:{
    marginTop: 50
  }
})