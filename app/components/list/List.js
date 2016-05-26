/**
 * Created by rtrompier on 30/03/16.
 */
import React, { Component } from 'react';
import {StyleSheet, Text, View, ListView, Navigator, RefreshControl} from 'react-native';
import ListElement from './ListElement';
import CountriesService from '../../services/CountriesService';
import TranslationService from '../../services/TranslationService';

const styles = StyleSheet.create({
    tabDirectory: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC'
    }
});

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class List extends React.Component{
    constructor() {
        super();

        //Init Datasource
        this.state = {
            currentLang: TranslationService.getCurrentLang(),
            countries: ds.cloneWithRows([])
        };
    }

    componentDidMount() {
        this._loadCountries();
    }

    componentWillUpdate(){
        if(this.state.currentLang !== TranslationService.getCurrentLang()){
            this._loadCountries();
        }
    }

    _loadCountries(){
        this.setState({
            isLoading:true,
            currentLang : TranslationService.getCurrentLang(),
            countries: ds.cloneWithRows([])
        });

        return new Promise((resolve) => {
            setTimeout(() => {
                CountriesService.list().then(c => {
                    this.setState({
                        countries: ds.cloneWithRows(c),
                        isLoading: false
                    });

                    resolve();
                });
            }, 300);
        });
    }

    render(){
        return (
            <ListView
                style={{marginTop: Navigator.NavigationBar.Styles.General.NavBarHeight+20}}
                dataSource={this.state.countries}
                initialListSize={1}
                pageSize={200}
                enableEmptySections={true}
                renderRow={(rowData) => <ListElement country={rowData}></ListElement>}
                renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={this._loadCountries.bind(this)}
                        tintColor="#007AFF"
                        title="Loading..."
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor="#007AFF"
                    />
                }
            />
        )
    }
};


export default List;