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
// import console = require('console');

const API_KEY = '16d717ecce764c5dab111103191206';
const DEFAULT_CITY = 'Phnom Penh';

const images ="./background/images/bluesky.jpg";
export default class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      zipcode: DEFAULT_CITY,
      days:[],
      condition:[],
    }
  }
  _getForecast(zipcode){
    const request_url= "https://api.apixu.com/v1/forecast.json?key="+API_KEY+"&q="+zipcode;
    axios.get(request_url).then( (response) => {  
      if(response.status == 200){
        var weather = response.data.forecast.forecastday;
        var locations = response.data.location.name;
        var forecast= [];
        console.log(response.data);
        this.setState({zipcode: locations})
       
        weather.forEach( (element,index) =>{
          forecast = forecast.concat([
            {
              date: element.day.weekday,
              temperature:
              {
                day:
                {
                  maxtemp_c: element.day.maxtemp_c,
                  condition: 
                  {
                    text: element.day.condition.text,
                  }
                }
              },
              average_humidity: element.evehumidity,
              icon_url: element.icon_url
            }
          ]);
        });
        this.setState({days:forecast});
      }
    }).catch( (error) =>{
      console.log(error);
    });
  }
  handlechangeText = (newCity) =>{
    this.setState({zipcode: newCity});
  }
  render() {
    if(this.state.days.length <= 0){
      this._getForecast(this.state.zipcode);
    }
    return (
      <ImageBackground source={ require(images)}
      style={styles.container}>
        {
          this.state.days.map( (element,index) =>{
            return(
              <View key={index} style={{ marginTop:10, justifyContent: 'center',alignItems:'center',}}>
                <Text style={styles.cityName}>{this.state.zipcode}</Text>
                <Text style={styles.weatherCondition}>{element.temperature.day.condition.text}</Text>
                <Text style={styles.temperature}>{element.temperature.day.maxtemp_c}°C </Text>
                <TextInput ref= "cityname" 
                style={styles.searchCity} 
                onChangeText={this.handlechangeText}
                placeholder="Search any City">
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
    color:'#fff',
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
  },
  
});
