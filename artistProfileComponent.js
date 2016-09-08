import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View,StyleSheet,ToolbarAndroid,TouchableHighlight,Navigator,ScrollView,Image } from 'react-native';

export default class artistProfileComponent extends Component {

    goHome(){
        this.props.navigator.pop();
    }

    render() {
        let artist_clip = {
            uri:this.props.art_img
        };
        console.log(this.props.art_img);
        return (
          <View style={{flex:1, backgroundColor:'#eee'}}>
              <View style={{padding:7,backgroundColor:'#133',elevation:5,flexDirection: 'row',justifyContent: 'space-between'}}>

                  <View style={{}}>
                      <Text style={styles.titleTxt}>{this.props.name}</Text>
                  </View>
                  <View style={styles.doneBtn}>
                      <TouchableHighlight  onPress={this.goHome.bind(this)}>
                          <Text style={styles.doneTxt}>Done</Text>
                      </TouchableHighlight>
                  </View>

              </View>{/*end of top toolbar*/}

              {/*main view section*/}
              <ScrollView>
                  <View>
                      <Image source={artist_clip} style={styles.imageHolder}/>
                      <Text style={styles.imgTitle}>{this.props.name}</Text>
                  </View>
              </ScrollView>
          </View>
        )

    }
}

const styles = StyleSheet.create({
    doneBtn:{
       /* backgroundColor:'red',*/
        paddingTop:8,
    },
    doneTxt:{
        width:40,
        color:'#ccc',
        fontStyle:'italic'

    },
    titleTxt:{
        color:'#ff9800',
        paddingLeft:5,
        paddingBottom:5,
        fontSize:22
    },
    imageHolder:{
        width: 200,
        height: 200,
        alignSelf:'center',
        marginTop:30
    },
    imgTitle:{
        alignSelf:'center',
        fontSize:19,
        fontWeight:'bold'
    }
});