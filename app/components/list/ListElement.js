/**
 * Created by rtrompier on 09/03/16.
 */
import React, { Component } from 'react';
import {StyleSheet, Image, Text, View, ListView, TouchableHighlight, Linking} from 'react-native';
import FilterService from '../../services/FilterService';
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#e9e9ef'
    },
    flag: {
        width: 30,
        height: 30
    }
});

class ListElement extends React.Component{
    constructor(props) {
        super(props);


        this.state = {
            ...props.country,
            img: 'https://www.ilo.org/ilostatcp/flags/48x48/' + props.country.code + '.PNG'
        }
    }

    _handleNext(){
        FilterService.setCurrentCountry(this.state.code);
        Actions.detail(this.state);
    }

    render(){
        return (
            <TouchableHighlight onPress={this._handleNext.bind(this)} underlayColor="white">
                <View style={styles.container}>
                    <Image
                        source={{uri: this.state.img}}
                        style={{width: 40, height: 40}}
                    />
                    <Text style={{marginTop:10}}>{this.state.label}</Text>
                </View>
            </TouchableHighlight>
        )
    }
};


export default ListElement;