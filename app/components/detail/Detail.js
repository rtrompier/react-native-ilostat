/**
 * Created by rtrompier on 30/03/16.
 */
import React, { Component } from 'react';
import {StyleSheet, Text, View, ListView, ScrollView, Navigator, RefreshControl, TouchableHighlight} from 'react-native';
import GiftedListView from 'react-native-gifted-listview';
import CountriesService from '../../services/CountriesService';
import DetailIndicator from './DetailIndicator';
import TranslationService from '../../services/TranslationService';
import FilterService from '../../services/FilterService';
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: Navigator.NavigationBar.Styles.General.NavBarHeight + 20
    },
    header: {
        flex: 0,
        flexWrap: 'nowrap',
        flexDirection: 'row',
        padding: 10
    },
    scrollView: {
        flex: 1,
        flexWrap: 'wrap',
        height: 500
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC'
    }
});

class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props,
        };
    }

    componentDidMount() {
        console.log('componentDidMount');

        Actions.refresh({
            title: this.state.label,
            rightTitle: FilterService.getCurrentYear(),
        });
    }

    componentWillMount(){
        console.log('componentWillMount');
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log('shouldComponentUpdate');


        this.forceUpdate();

        /*Actions.refresh({
            title: this.state.label,
            rightTitle: FilterService.getCurrentYear(),
        });*/

        return false;
    }

    componentWillUpdate(){
        console.log('componentWillUpdate');
    }

    _onFetch(page = 1, callback, options) {
        console.log('Current country', FilterService.getCurrentCountry());
        console.log('Current year', FilterService.getCurrentYear());

        Actions.refresh({
            title: this.state.label,
            rightTitle: FilterService.getCurrentYear(),
        });

        var rows = {};

        if(FilterService.getCurrentYear() == '2011'){
            var rows = [{
                    
            },{

            }];

            callback(rows, {
                allLoaded: true, // the end of the list is reached
            });

        }else{
            setTimeout(() => {
                CountriesService.detail(FilterService.getCurrentCountry()).then(d => {
                    var lastSection = null;
                    for(row of d.rows){
                        if(row.subject != ''){
                            lastSection = row.subject;
                        }

                        if(!(lastSection in rows)){
                            rows[lastSection] = []
                        }

                        rows[lastSection].push(row);
                    }

                    callback(rows, {
                        allLoaded: true // the end of the list is reached
                    });
                });
            }, 500);
        }
    }

    /**
     * Render a row
     * @param {object} rowData Row data
     */
    _renderSectionHeaderView(sectionData, sectionID) {
        return (
            <Text style={{backgroundColor: '#50a4ff',padding: 10, color: '#fff'}} key={sectionID}>
                {sectionID}
            </Text>
        );
    }

    /**
     * Render a row
     * @param {object} rowData Row data
     */
    _renderRowView(rowData, sectionId, rowID) {
        let key = 'row_' + sectionId + '_' + rowID;
        console.log('_renderRowView');
        return (
            <View key={key}>
                <DetailIndicator indicator={rowData}></DetailIndicator>
            </View>
        );
    }

    /**
     * Render a separator between rows
     */
    _renderSeparatorView(sectionID, rowID) {
        let key = 'separator_' + sectionID + '_' + rowID;
        return (
            <View key={key} style={{height: 1,backgroundColor: '#CCC'}} />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{flex:1}}>{TranslationService.translate('indicator')}</Text>
                    <Text>{TranslationService.translate('value')}</Text>
                </View>

                <GiftedListView
                    rowView={this._renderRowView}
                    onFetch={this._onFetch.bind(this)}
                    sectionHeaderView={this._renderSectionHeaderView.bind(this)}
                    renderSeparator={this._renderSeparatorView.bind(this)}
                    firstLoader={true} // display a loader for the first fetching
                    refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                    withSections={true} // enable sections
                    pagination={false} // enable infinite scrolling using touch to load more
                    customStyles={{
                        paginationView: {
                            backgroundColor: 'transparent',
                        },
                     }}
                    refreshableTintColor="#50a4ff"
                />


            </View>
        )
    }
};

export default Detail;