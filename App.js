/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  View,   
  ImageBackground,
  TextInput,
} from 'react-native';
import axios from 'axios';

const API_KEY = '16d717ecce764c5dab111103191206';

const images = '';
export default class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      city: "Phnom Penh",
      days:[],
      condition:[],
      temp_c:[],
      background: images,
      isLoading: false
    }
  }
  _getForecast(city){
    const request_url= "https://api.apixu.com/v1/forecast.json?key="+API_KEY+"&q="+city;
    axios.get(request_url).then( (response) => {  
      if(response.status == 200){
        var weather = response.data.forecast.forecastday;
        var locations = response.data.location.name;
        var forecast= [];
        console.log(response.data)
        var weathercondition = response.data.current.condition.text;
        var temp = response.data.current.temp_c;
        this.setState({temp_c:temp})
        this.setState({condition:weathercondition})
        this.setState({city: locations})
        weather.forEach( (element) =>{
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
              }
            }
          ]);
        });
        this.setState({days:forecast});
        
        if(weathercondition == 'Cloudy' || weathercondition == 'Mostly Cloud' ){
          this.setState({background: require('./background/images/cloudy.jpg')});
        }else if(weathercondition == 'Light rain shower' || weathercondition == 'shower' ){
          this.setState({background: require('./background/images/showers.jpg')});
        }else if(weathercondition == 'Rain' || weathercondition == 'light rain' || weathercondition == 'heavy rain'){
          this.setState({background: require('./background/images/rain.jpg')});
        }else if(weathercondition == 'Mist' || weathercondition == 'mist' || weathercondition == 'Fog'){
          this.setState({background: require('./background/images/mist.jpg')});
        }else if(weathercondition == 'Thunderstorm' || weathercondition == 'thunderstorm' ){
          this.setState({background: require('./background/images/stormy.png')});
        }else if(weathercondition == 'Clear' || weathercondition == 'clear sky' || weathercondition == 'Overcast'){
          this.setState({background: require('./background/images/clear.jpg')});
        }else if(weathercondition == 'Rain' || weathercondition == 'Heavy rain' || weathercondition == 'Moderate rain'){
          this.setState({background: require('./background/images/rainy-cloud.jpg')});
        }else if(weathercondition == 'Sunny' ){
          this.setState({background: require('./background/images/sunny.jpeg')});
        }else if(weathercondition == 'Haze' || weathercondition=='Patchy light drizzle'){
          this.setState({background: require('./background/images/haze.jpeg')});
        }else if(weathercondition == 'Partly cloudy' ){
          this.setState({background: require('./background/images/bluesky.jpg')});
        }else if(weathercondition == 'Moderate rain at times' ){
          this.setState({background: require('./background/images/rainattime.jpg')});
        }
      }
    }).catch( (error) =>{
      console.log(error);
    });
  }
  searchCity = async () => {
    this.setState({
      isLoading: true
    });
    const url = `https://api.apixu.com/v1/forecast.json?key=${API_KEY}&q=${this.state.city}`;
    axios.get(url).then( (response) => {  
      if(response.status == 200){
        var weather = response.data.forecast.forecastday;
        var locations = response.data.location.name;
        var forecast= [];
        var weathercondition = response.data.current.condition.text;
        var temp = response.data.current.temp_c;
        console.log(weathercondition)
        this.setState({temp_c:temp})
        this.setState({condition:weathercondition})
        this.setState({city: locations})
        weather.forEach( (element) =>{
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
              }
            }
          ]);
        });
        this.setState({days:forecast});

        if(weathercondition == 'Cloudy' || weathercondition == 'Mostly Cloud' ){
          this.setState({background: require('./background/images/cloudy.jpg')});
        }else if(weathercondition == 'Light rain shower' || weathercondition == 'shower' ){
          this.setState({background: require('./background/images/showers.jpg')});
        }else if(weathercondition == 'Rain' || weathercondition == 'light rain' || weathercondition == 'heavy rain'){
          this.setState({background: require('./background/images/rain.jpg')});
        }else if(weathercondition == 'Mist' || weathercondition == 'mist' || weathercondition == 'Fog'){
          this.setState({background: require('./background/images/mist.jpg')});
        }else if(weathercondition == 'Thunderstorm' || weathercondition == 'thunderstorm' || weathercondition == 'Thundery outbreaks possible'){
          this.setState({background: require('./background/images/stormy.png')});
        }else if(weathercondition == 'Clear' || weathercondition == 'clear sky' || weathercondition == 'Overcast'){
          this.setState({background: require('./background/images/clear.jpg')});
        }else if(weathercondition == 'Rain' || weathercondition == 'Heavy rain' || weathercondition == 'Moderate rain'){
          this.setState({background: require('./background/images/rainy-cloud.jpg')});
        }else if(weathercondition == 'Sunny' ){
          this.setState({background: require('./background/images/sunny.jpeg')});
        }else if(weathercondition == 'Haze' || weathercondition=='Patchy light drizzle'){
          this.setState({background: require('./background/images/haze.jpeg')});
        }else if(weathercondition == 'Partly cloudy' ){
          this.setState({background: require('./background/images/bluesky.jpg')});
        }else if(weathercondition == 'Moderate rain at times' ){
          this.setState({background: require('./background/images/rainattime.jpg')});
        }
      }
    })
  };
  render() {
    if(this.state.days.length <= 0){
      this._getForecast(this.state.city);
    }
    return (
      <ImageBackground source={(this.state.background)}
      style={styles.container}>
        {
          this.state.days.map( (index) =>{
            return(
              <View key={index} style={{ marginTop:10, justifyContent: 'center',alignItems:'center',}}>
                <Text style={styles.cityName}>{this.state.city}</Text>
                <Text style={styles.weatherCondition}>{this.state.condition}</Text>
                <Text style={styles.temperature}>{this.state.temp_c}°C </Text>
                <TextInput ref= "cityname" 
                  style={styles.searchCity} 
                  onChangeText={city => {
                    this.setState({ city });
                  }}
                  onSubmitEditing={this.searchCity}
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
