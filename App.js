/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground,
  TextInput,
} from 'react-native';
// import axios from 'axios';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const API_KEY = 'df321a026c2f5245320b089d52dcedb3';
const cityName = [
  'Phnom Penh \n',
  'Bang Kok \n',
  'New York \n',
  'China \n',
  'Paris \n'
];
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <ImageBackground source={ require('./background/images/bluesky.jpg')}
      style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.cityName}>{cityName}</Text>
          <Text style={styles.weatherCondition}>Blue Sky</Text>
          <Text style={styles.temperature}>27</Text>
          <TextInput style={styles.searchCity} placeholder="Search City"></TextInput>
          
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  cityName: {
    fontSize: 30,
    color:'#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 5,
  },
  searchCity: {
    color: '#fff',
    borderWidth: 1,
    borderColor: '#fafafa',
    backgroundColor:'#f5f5f5',
    width: 200,
    height: 30,
    borderRadius: 10,
    paddingLeft: 10,
  },
  weatherCondition: {
    color: "#fff",
    fontSize:20,
    textAlign: 'center',
    paddingBottom: 10,
  },
  temperature:{
    color: "#fff",
    fontSize:30,
    textAlign: 'center',
    paddingBottom: 20,
  }
});
