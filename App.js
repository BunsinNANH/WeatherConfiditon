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
import axios from 'axios';

const API_KEY = 'df321a026c2f5245320b089d52dcedb3';
const DEFAULT_ZIPCODE = 90210;
const cityName = [
  'Phnom Penh',
  'Bang Kok',
  'New York',
  'China',
  'Paris'
];
type Props = {};
export default class App extends Component<Props> {
  constructor(){
    super();
    this.state={
      zipcode: DEFAULT_ZIPCODE,
      days:[],
    }
  }
  _getForecast(cityName){
    
    const request_url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+",&appid="+API_KEY;
    axios.get(request_url).then((response)=>{
      if( response.status == 200){
        console.log(response.data);
      }
    });
  }
  
  render() {
    // if( this.state.days.length<=0){
    //   this._getForecast(this.state.cityName);
    // }
    return (
      <ImageBackground source={ require('./background/images/bluesky.jpg')}
      style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.cityName}>Phnom Penh</Text>
          <Text style={styles.weatherCondition}>Blue Sky</Text>
          <Text style={styles.temperature}>27</Text>
          <TextInput ref= "cityname"
          onChangeText={(text) => this.setState({text})}
                  value={this.state.cityName} style={styles.searchCity} 
                  placeholder="Search City"></TextInput>
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
    color: '#000',
    borderWidth: 1,
    borderColor: '#fafafa',
    backgroundColor:'#f5f5f5',
    width: 250,
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
