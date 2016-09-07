import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View,StyleSheet,ToolbarAndroid,TouchableHighlight,Navigator } from 'react-native';

export default class artistProfileComponent extends Component {

    goHome(val){
        this.props.navigator.pop();
    }

    render() {
        return (
          <View>
              <View style={{padding:7,backgroundColor:'#133',elevation:5,flexDirection: 'row',justifyContent: 'space-between'}}>

                  <View style={{}}>
                      <Text style={styles.titleTxt}>{this.props.name}</Text>
                  </View>
                  <View style={styles.doneBtn}>
                      <TouchableHighlight  onPress={this.goHome.bind(this,'Top POP Artists')}>
                          <Text style={styles.doneTxt}>Done</Text>
                      </TouchableHighlight>
                  </View>

              </View>

              <Text>{this.props.name}</Text>
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
    }
});