import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View,StyleSheet,ToolbarAndroid,TouchableHighlight,Navigator } from 'react-native';
import AllArtists from './allArtistsComponent';
import ArtistProfile from './artistProfileComponent';

class listProject extends Component {

    renderScene(route,navigator){
        if(route.title=='Top POP Artists'){
            return <AllArtists title={route.title} navigator={navigator}/>
        }else{
            return <ArtistProfile name={route.title} art_img={route.art_img}  navigator={navigator}/>
        }
    }

  render() {
     return (
         <Navigator
             initialRoute={{ title: 'Top POP Artists'}}
             renderScene={this.renderScene.bind(this)}
             configureScene={(route, routeStack) =>
              Navigator.SceneConfigs.FloatFromBottomAndroid}
         />
     )

  }
}

// App registration and rendering
AppRegistry.registerComponent('listProject', () => listProject);