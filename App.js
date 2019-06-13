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
const DEFAULT_ZIPCODE = 12220;

const images ="./background/images/bluesky.jpg";
export default class App extends Component {
  constructor(){
    super();
    this.state ={
      zipcode: DEFAULT_ZIPCODE,
      days:[],
    }
  }
  _getForecast(zipcode){
    const request_url= "https://api.apixu.com/v1/forecast.json?key="+API_KEY+"&q="+zipcode;
    axios.get(request_url).then( (response) => {  
      if(response.status == 200){
        var weather = response.data.current.condition;
        var locations = response.data.location;
        var cityname = Object.keys(locations).map(function(key) {
          return [Number(key), locations[key]];
        });
        console.log(cityname[1][1])
        this.setState({ days:cityname[1][1]});
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
      <ImageBackground source={ require(images)}
      style={styles.container}>
        {
          this.state.days.map( (element,index) =>{
            return(
              <View key={index} style={{ marginTop:10, justifyContent: 'center',alignItems:'center',}}>
                <Text style={styles.cityName}>{this.state.locations}</Text>
                <Text style={styles.weatherCondition}></Text>
                <Text style={styles.temperature}></Text>
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
