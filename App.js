/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
// import getImageBackground from './weather/getImageBackground';
import {Platform, 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground,
  TextInput,
} from 'react-native';
import axios from 'axios';
function funchange(){
  console.log(this);
}
const API_KEY = 'df321a026c2f5245320b089d52dcedb3';
const DEFAULT_ZIPCODE = 90210;

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state={
      cityname:'Phnom Penh',
    }
    this.handlechangeText = this.handlechangeText.bind(this);
  }
  state = {
    loading: false,
    error : false,
    location: '',
    temperature:0,
    weather: ""
  }
  componentDidMount(){
    this.handlechangeText('Phnom Penh');
  }
  handlechangeText = async cityname =>{
    // this state
    if(!cityname) return;
      this.setState({
        loading:true,
        location: cityname,}, async () =>{
          try{
            const locationId = await fetchLocationId(cityname);
            const { location, weather , temperature} = await fetchWeather(
              locationId
            );
            this.setState({
              loading: false,
              error : false,
              location,
              temperature,
              weather
            });
          } catch (e){
            this.setState({
              loading: false,
              error : true,
            })
          }
        }
     )
  }
  _getForecast(cityname){
    
    const request_url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityname+"&units=metric"+ "&APPID="+ API_KEY;
    axios.get(request_url).then((response)=>{
      if( response.status == 200){
        console.log(response.data);
      }
    });
  }
  
  render() {
    // if( this.state.cityname.length<=0){
    //   this._getForecast(this.state);
    //   console.log(this.state);
    // }
    return (
      <ImageBackground source={ require('./background/images/bluesky.jpg')}
      style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.cityName}>{this.state.cityname}</Text>
          <Text style={styles.weatherCondition}>Blue Sky</Text>
          <Text style={styles.temperature}>27</Text>
          <TextInput ref= "cityname"
                  onChangeText={this.handlechangeText}
                  style={styles.searchCity} 
                  placeholder="Search City">
          </TextInput>
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
