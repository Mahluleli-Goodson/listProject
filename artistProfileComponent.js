import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View,StyleSheet,ToolbarAndroid,TouchableHighlight,Navigator,ScrollView,Image,Linking } from 'react-native';

export default class artistProfileComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
          artist_bio:'loading, wait...'
        };
        this.getArtistInfo();
    }

    getArtistInfo(){
        var artistName = encodeURIComponent(this.props.name);
        fetch('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+artistName+'&api_key=57ee3318536b23ee81d6b27e36997cde&format=json').
            then(function (response) {
                return response.json();
            }).
            then(function (respObj) {
            this.setState({
                artist_bio:respObj.artist.bio.content
            });
            console.log(respObj);
            }.bind(this)).
            catch(function (error) {
            console.error(error);
            });
    };

    goHome(){
        this.props.navigator.pop();
    }

    render() {
        let artist_clip = {
            uri:this.props.art_img
        };
        console.log(this.props.art_img);
        return (
          <View style={styles.container}>
              <View style={{padding:7,backgroundColor:'#133',elevation:5,flexDirection: 'row',justifyContent: 'space-between'}}>

                  <View>
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
                  <View style={styles.profileCard}>
                      <Image source={artist_clip} style={styles.imageHolder}/>
                      <Text style={styles.imgTitle}>{this.props.name}</Text>
                      <View style={styles.profileParaContainer}>
                          <Text style={styles.profilePara}>
                              {this.state.artist_bio}
                          </Text>
                      </View>
                      <View>
                          <Text>Similar Artists:</Text>
                      </View>
                  </View>
              </ScrollView>
              {/*<Text style={styles.anchors} onPress={() => Linking.openURL('http://www.theriket.com/#/')}>Powered By TheRiket</Text>*/}
          </View>
        )

    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:null,
        height:null
    },
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
        borderRadius:100,
        borderColor:'#ff9800',
        borderWidth:5
        /*marginTop:30*/
    },
    imgTitle:{
        alignSelf:'center',
        fontSize:19,
        fontWeight:'bold'
    },
    profileCard:{
        backgroundColor:'rgba(0,0,0,0.4)',
        marginTop:7,
        marginLeft:10,
        marginRight:10,
        marginBottom:7,
        padding:10,
        width:null,
        height:null,
        elevation:2,
        borderRadius:3
    },
    profileParaContainer:{
        borderTopColor:'#133',
        borderTopWidth:1,
        borderBottomColor:'#133',
        borderBottomWidth:1,
        borderStyle:'solid',
        paddingTop:10,
        marginBottom:10
    },
    profilePara:{
        /*backgroundColor:'#ff4',*/
        textAlign:'justify',
        fontSize:17,
        lineHeight:25
    },
    anchors:{
        color:'#133',
        fontWeight:'100',
        position:'relative',
        bottom:0
    }
});