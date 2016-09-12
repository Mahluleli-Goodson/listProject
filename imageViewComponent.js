import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View,StyleSheet,ToolbarAndroid,TouchableHighlight,Navigator,Modal } from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import AnotherOne from './artistProfileComponent';

export default class imageViewComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: this.props.modalStatus
        }; //false

        console.log('modalStatus,',this.props.modalStatus);
    }

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        });
        /*this.props.onChange('hallo');*/
        console.log('balah')
    }

    render() {

        return (
            <View style={{marginTop: 0,backgroundColor:'rgba(0,0,0,0.5)'}}>
                <Modal
                    animationType={"fade"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {console.log('closed image view')}}
                >
                    <View style={{marginTop: 22}}>
                        <View>
                            <Image
                                source={this.props.imageEnlarge}
                                indicator={ProgressBar}
                                indicatorProps={{color: '#133'}}
                                style={styles.bigImageHolder}
                            />

                            <TouchableHighlight onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                                <Text style={{marginTop: 20,textAlign:'center',fontSize:18,color:'#22f'}}>Close</Text>
                            </TouchableHighlight>

                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    bigImageHolder:{
        width: 300,
        height: 300,
        alignSelf:'center',
        /*borderRadius:100,
         borderColor:'#ff9800',
         borderWidth:5*/

    }
});