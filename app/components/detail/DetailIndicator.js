/**
 * Created by rtrompier on 30/03/16.
 */
import React, { Component } from 'react';
import {StyleSheet, Text, View, ListView, ScrollView, TouchableHighlight} from 'react-native';
import FilterService from '../../services/FilterService';
let Actions = require('react-native-router-flux').Actions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10
    },
    left: {
        flex: 1
    },
    right: {
        width: 100,
        textAlign: 'right'
    }
});


class DetailIndicator extends React.Component{
    constructor(props) {
        super(props);

        this.currentYear = FilterService.getCurrentYear();
        let value = 'N.C';
        let description = '';
        let val = props.indicator.values.filter((val) => {
            return val && val.time == this.currentYear ? true : false;
        })[0];

        if(val && val.value && val.value.code){
            value = val.value.code;
            description = val.value.label;
        }


        this.state = {
            ...props,
            value,
            description
        };

    }

    _handleDescription(){
        Actions.description(this.state);
    }
    
    render(){
        return (
            <TouchableHighlight onPress={this._handleDescription.bind(this)} underlayColor="white">
                <View style={styles.container}>
                    <Text style={styles.left}>{this.state.indicator.indicator.code}</Text>
                    <Text style={styles.right}>{this.state.value}</Text>
                </View>
            </TouchableHighlight>
        )
    }
};


export default DetailIndicator;