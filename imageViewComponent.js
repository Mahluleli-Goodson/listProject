import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View,StyleSheet,ToolbarAndroid,TouchableHighlight,Navigator,Modal } from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

export default class imageViewComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {modalVisible: false};
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View style={{marginTop: 22}}>
                <Modal
                    animationType={"slide"}
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
                                style={styles.imageHolder}
                            />

                            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>

                        </View>
                    </View>
                </Modal>

                <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
                    <Text>Show Modal</Text>
                </TouchableHighlight>

            </View>
        );
    }
}

var styles = StyleSheet.create({});