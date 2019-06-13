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
import { thisExpression } from '@babel/types';
// import console = require('console');

const API_KEY = '16d717ecce764c5dab111103191206';
const DEFAULT_ZIPCODE = 90210;

export default class App extends Component {
  constructor(){
    super();
    this.state ={
      zipcode: DEFAULT_ZIPCODE,
      days:[],
      cityname: 'Phnom Penh',
    }
  }
  _getForecast(zipcode){
    const request_url= "https://api.apixu.com/v1/forecast.json?key="+API_KEY+"&q="+zipcode;
    axios.get(request_url).then( (response) => {  
      if(response.status == 200){
        console.log(response.data)
        var weather = response.data.forecast.forecastday;
        var locations = response.data.location;
        console.log(locations);
        console.log(weather);
        var forecast = [];
        var cityname = [];
        locations.forEach( (element, index) =>{
          cityname = location([
            {
              name: element.name,
            }
          ]);
        })
        weather.forEach( (element, index) =>{
          forecast = forecast.concat([
            {
              date: element.date.weekday,
              temperature:{
                high: 
                {
                  fahrenheit: element.high.fahrenheit,
                  celsius: element.high.celsius,
                },
                low:
                {
                  fahrenheit: element.low.fahrenheit,
                  celsius: element.low.celsius
                }
              },
              conditions: element.conditions,
              wind:
              {
                mph: element.avewind.mph,
                dir: element.avewind.dir
              },
              average_humidity: element.avehumidity,
              icon_url: element.icon_url,
            }
          ]);
          console.log(forecast);
        });
        this.setState({ days: data.forecast});
        console.log(days);
      }
    }).catch( (error) =>{
      console.log(error);
    });
  }
  render() {
    if(this.state.days.length <= 0){
      this._getForecast(this.state.zipcode);
    }
    return (
      <ImageBackground source={ require('./background/images/bluesky.jpg')}
      style={styles.container}>
        {
          this.state.days.map( (element,index) =>{
            return(
              <View key={index} style={styles.inner}>
                <Text style={styles.cityName}>{response.data.locations.name}</Text>
                <Text style={styles.weatherCondition}>{element.conditions}</Text>
                <Text style={styles.temperature}>{element.temperature.high.celsius}C</Text>
                <TextInput ref= "cityname"
                        onChangeText={this.handlechangeText}
                        style={styles.searchCity} 
                        placeholder="Search City">
                </TextInput>
              </View>
            )
          })
        }
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
    // color:'#ffffff',
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
    // color: "#fff",
    fontSize:20,
    textAlign: 'center',
    paddingBottom: 10,
  },
  temperature:{
    // color: "#fff",
    fontSize:30,
    textAlign: 'center',
    paddingBottom: 20,
  },
  inner:{
    marginTop:10,
    justifyContent: 'center',
    alignItems:'center',
  }
});
