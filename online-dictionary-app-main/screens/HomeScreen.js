import React,{Component} from "react"
import{Button,View,TouchableOpacity,Text,StyleSheet,Image,TextInput,Alert} from "react-native"
import {SafeAreaProvider,SafeAreaView} from "react-native-safe-area-context"
import {Audio} from "expo-av"
import {Header} from "react-native-elements"
export default class HomeScreen extends Component{
   constructor(){
    super()
    this.state={
      text:"",
      isSearchPressed:false,
      isloading:false,
      word:"",
      lexicalcategory:"",
      definition:"",
      wordprefix:"",
      meaningprefix:"",
      typeprefix:"",
     
    }
  }
  getword=(word)=>{
   var searchword=word.toLowerCase().trim
    this.setState({
      "word1":searchword
    })
   var url = "https://api.dictionaryapi.dev/api/v2/entries/en_US/"+word
   return fetch(url)
   .then((data)=>{
    if(data.status===200){
      
      return data.json()
    }
    else{
      return null
    }
   })
   .then((response)=>{
     var responseobj=response
     console.log(responseobj)
     if(responseobj){
       var word = responseobj[0].word;
       var definition = responseobj[0].meanings[0].definitions[0].definition;
       var lexicalcategory = responseobj[0].meanings[0].partOfSpeech;
       this.setState({
         "word":this.state.text,
         "definition":definition,
         "lexicalcategory":lexicalcategory,
         "wordprefix":"Word:  ",
         "meaningprefix":"Meaning:  ",
         "typeprefix":"Type:  "
       })
     }
     else{
       this.setState({
         "word":this.state.text,
         "definition":"Not Found",
         "lexicalcategory":"Not Found",
         "wordprefix":"word:  ",
         "meaningprefix":"Meaning:  ",
         "typeprefix":"Type:  "
       })
     }
   })
  }
  render(){
    return(
      <SafeAreaProvider>
      <View style={styles.container}>
     <Header  centerComponent={{text:"VIRTUAL DICTIONARY",style:{color:"#fff",fontSize:18,fontWeight:500}}} backgroundColor={""}>
     </Header>
        <Image style={styles.imageicon} source={{uri:'https://i.pinimg.com/originals/b8/14/07/b814074ed659c8bb667d69564678b9c1.jpg'}}>
        </Image>
        <TextInput
        style={styles.inputbox}
        placeholder="Type any word"
        onChangeText={
          text=>{
            var hello=text.trim().toLowerCase()
            this.setState({
              text:hello,
              isSearchPressed:false,
              word:"loading..",
              lexicalcategory:"",
              definition:"",
              wordprefix:"",
              typeprefix:"",
              meaningprefix:""
            }) 
          }
        }
        value={
           this.state.text
        }
        >
        </TextInput>
        <TouchableOpacity
          style={styles.searchbutton}
          onPress={() => {
            this.setState({ isSearchedPressed: true});
            this.getword(this.state.text);
          }}>
        <Text style={{color:"white",textAlign:"center",fontSize:20}}>Search</Text>
        </TouchableOpacity>
       <View>
       </View>
      </View>
        <Text style={{fontWeight:500,fontSize:18}}>{this.state.wordprefix}{this.state.word}</Text>
        <Text style={{fontWeight:500,fontSize:18}}>{this.state.meaningprefix}{this.state.definition}</Text>
        <Text style={{fontWeight:500,fontSize:18}}>{this.state.typeprefix}{this.state.lexicalcategory}</Text>
      </SafeAreaProvider>
    )
  }
}
const styles = StyleSheet.create({
  container:{
  flex:1,
  },
  inputbox:{
  marginTop:80,
  width:"80%",
  alignSelf:"center",
  height:40,
  textAlign:"center",
  borderWidth:4,
  outLine:"none"
  },
  imageicon:{
     width:150,
     height:150,
     marginLeft:95,
     marginTop:60
  },
  searchbutton:{
   width:"30%",
   height:40,
   alignSelf:"center",
   padding:10,
   margin:10,
   borderWidth:2,
   borderRadius:15,
   backgroundColor:"orange",
   justifyContent:"center"
  },
});
