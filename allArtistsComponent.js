import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View,StyleSheet,ToolbarAndroid,TouchableHighlight } from 'react-native';

export default class allArtistsComponent extends Component {
    // Initialize the hardcoded data
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            loader:'LOADING...',
            name:'',
            title:this.props.title,/*or use props.title ---still in same scope*/
            dataSource: ds.cloneWithRows([''])
        };

        this.loadArtists();
    };

    /*function to display name of selected artist*/
    sayMyName(text,img){
        /*console.log(text);*/
        this.setState({
            name:text,
            title:text
        });
        this.props.navigator.push({
            title:text,
            art_img:img
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
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    dataSource:ds.cloneWithRows(jsonOBJ),
                    loader:''
                });
                console.log(jsonOBJ);
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
        /*var customData = require('./students.json'); //require local JSON
         console.log(customData);*/
    };
    /*END function to fetch artists*/

    render() {
        return (
            <View style={{flex:1}}>
                <ToolbarAndroid style={styles.toolBar}><Text style={{color:'#fff'}}>{this.state.title}</Text></ToolbarAndroid>
                <Text style={styles.loaderGIF}>{this.state.loader}</Text>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
              <TouchableHighlight onPress={()=>this.sayMyName(rowData.name,rowData.image[4]["#text"])}>
               <Text style={styles.singleList}>{rowData.name}</Text>
              </TouchableHighlight>
               }
                />
                {/*<View style={styles.outputText}><Text style={{fontSize:15,color:'#113'}}>{this.state.name}</Text></View>*/}
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
    }
});
