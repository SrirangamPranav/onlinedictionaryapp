import React,{Component} from "react"
import{Button,View,TouchableOpacity,Text,StyleSheet} from "react-native"
import {Audio} from "expo-av"
import HomeScreen from "./screens/HomeScreen"
import {createAppContainer,createSwitchNavigator} from "react-navigation"
export default class App extends Component{
  render(){
    return(
    <View>
    <AppContainer></AppContainer>
    </View>
    )
  }
}
var AppNavigator = createSwitchNavigator({
  HomeScreen:HomeScreen,
})
const AppContainer = createAppContainer(AppNavigator)