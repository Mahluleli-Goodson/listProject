import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View,StyleSheet,ToolbarAndroid,TouchableHighlight } from 'react-native';
import Image from 'react-native-image-progress';

export default class allArtistsComponent extends Component {
    // Initialize the hardcoded data
    constructor(props) {
        super(props);
        this.state = {
            loader:'LOADING...',
            title:this.props.title,/*or use props.title ---still in same scope*/
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([''])
        };

        this.loadArtists();
    };

    /*function to display name of selected artist*/
     pushArtist(text){
        this.props.navigator.push({
            title:text
        });
    };
    /*END function to display name of selected artist*/

    /*function to fetch artists*/
    loadArtists(){
        fetch('http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=pop&api_key=57ee3318536b23ee81d6b27e36997cde&format=json')
            .then(function (response) {
                return response.json();
            })
            .then(function (respJSON) {
                var jsonOBJ = respJSON.topartists.artist;
                this.setState({
                    dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(jsonOBJ),
                    loader:''
                });
                /*console.log(jsonOBJ);*/
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
        /*var customData = require('./students.json'); //require local JSON
         console.log(customData);*/
    };
    /*END function to fetch artists*/

    render() {

        let artist_list_area = '';

        //show gif loader while artist-list is still loading
        if(this.state.loader=='LOADING...'){
            artist_list_area=
                <View style={this.state.loader=='LOADING...'?styles.centerGif:''}>
                    <Image source={require("./ripple.gif")}/>
                </View>;
        }else{
            artist_list_area =
                <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) =>
              <TouchableHighlight onPress={()=>this.pushArtist(rowData.name)}>
               <Text style={styles.singleList}>{rowData.name}</Text>
              </TouchableHighlight>
               }
            />;
        }

        return (
            <View style={{flex:1, backgroundColor:'#eee'}}>
                <ToolbarAndroid style={styles.toolBar}><Text style={{color:'#fff'}}>{this.state.title}</Text></ToolbarAndroid>
                    {artist_list_area}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    singleList:{
        backgroundColor:'#ff9800',
        textAlign:'center',
        marginTop:2,
        padding:10,
        fontSize:20,
        elevation:2
    },
    toolBar:{
        padding:15,
        backgroundColor:'#133',
        elevation:5
    },
    outputText:{
        padding:6,
        borderStyle:'solid',
        borderTopColor:'red',
        borderTopWidth:2
    },
    loaderGIF:{
        fontSize:20,
        textAlign:'center',
        color:'#CB1B0E'
    },
    centerGif:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
