import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View,StyleSheet,ToolbarAndroid,TouchableHighlight,Navigator,ScrollView,Linking } from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import AllArtistsFunc from './allArtistsComponent';

export default class artistProfileComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            artist_bio:'loading, wait...',
            art_img:'',
            similarOBJ:['']
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
                artist_bio:respObj.artist.bio.content,
                art_img:respObj.artist.image[4]["#text"],
                similarOBJ:respObj.artist.similar.artist
            });
            console.log(respObj);
            /*console.log('similar',respObj.artist.similar.artist);*/
            }.bind(this)).
            catch(function (error) {
            console.error(error);
            });
    };

    goHome(){
        this.props.navigator.pop();
    };
    fetchArt(artVal){
        this.props.navigator.push({
            title:artVal
        });
        console.log(artVal);
    };

    render() {
        let artist_clip = {
            uri:this.state.art_img
        };
        let bio_area='';//initialise bio-content variable

        //show gif loader while content-bio is still loading
        if(this.state.artist_bio=='loading, wait...'){
             bio_area= <Image source={require("./ripple.gif")} style={styles.gifLoader}/>;
        }else{
            bio_area = <Text style={styles.profilePara}>{this.state.artist_bio}</Text>
        }

        return (
          <View style={styles.container}>
              <View style={{padding:7,backgroundColor:'#133',elevation:5,flexDirection: 'row',justifyContent: 'space-between'}}>

                  <View>
                      <Text style={styles.titleTxt}>{this.props.name}</Text>
                  </View>
                  <View style={styles.doneBtn}>
                      <TouchableHighlight  onPress={this.goHome.bind(this)} style={{borderRadius:20,borderStyle:'solid',borderWidth:1,borderColor:'#c5d8df'}}>
                          <Text style={styles.doneTxt}>done</Text>
                      </TouchableHighlight>
                  </View>

              </View>{/*end of top toolbar*/}

              {/*main view section*/}
              <ScrollView style={{backgroundColor:'#ddd'}}>
                  <View style={styles.profileCard}>
                      <View style={styles.profileCardInner}>
                          <Image
                              source={artist_clip}
                              indicator={ProgressBar}
                              indicatorProps={{color: '#133'}}
                              style={styles.imageHolder}
                          />
                          <Text style={styles.imgTitle}>{this.props.name}</Text>
                          <View style={styles.profileParaContainer}>
                              {bio_area}
                          </View>
                          <View>
                              <Text style={{fontSize:17}}>Similar Artists:</Text>
                              <View>
                                  {
                                      this.state.similarOBJ.map(function (similar_art,index) {
                                         return(
                                             <TouchableHighlight onPress={()=>this.fetchArt(similar_art.name)} key={index} style={styles.listStyle}>
                                                 <Text style={styles.similarList}>{similar_art.name}</Text>
                                             </TouchableHighlight>
                                         ) ;

                                      }.bind(this))
                                  }
                              </View>
                          </View>
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
        /*backgroundColor:'red',*/
        paddingTop:8
    },
    doneTxt:{
        width:40,
        color:'#ccc',
        fontStyle:'italic',
        textAlign:'center'

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
        backgroundColor:'#fff',
        marginTop:7,
        marginLeft:10,
        marginRight:10,
        marginBottom:7,
        elevation:2
    },
    profileCardInner:{
        backgroundColor:'#fff',
        padding:10
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
        lineHeight:25,
        color:'#000'
    },
    anchors:{
        color:'#133',
        fontWeight:'100',
        position:'relative',
        bottom:0
    },
    gifLoader:{
        width:40,
        height:40,
        alignSelf:'center'
    },
    listStyle:{
        borderColor:'#ff9800',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:5,
        padding:5,
        margin:3
    },
    similarList:{
        fontSize: 16,
        color: '#133',
        textAlign:'center'
    }
});