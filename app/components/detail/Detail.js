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

let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props,
            dataSource: ds.cloneWithRowsAndSections({}),
            isLoading: true
        };
    }

    componentDidMount() {
        Actions.refresh({
            title: this.state.label,
            rightTitle: FilterService.getCurrentYear(),
        });

        this.load();
    }

    componentWillUpdate(){
        if(this.state.rightTitle !== FilterService.getCurrentYear()){
            Actions.refresh({
                rightTitle: FilterService.getCurrentYear(),
            });

            this.load();
        }
    }

    load() {
        this.setState({
            dataSource: ds.cloneWithRowsAndSections({}),
            isLoading: true,
            rightTitle: FilterService.getCurrentYear(),
        });

        return new Promise((resolve) => {
            let rows = {};
            setTimeout(() => {
                CountriesService.detail(FilterService.getCurrentCountry()).then(d => {
                    let lastSection = null;
                    for(row of d.rows){
                        if(row.subject != ''){
                            lastSection = row.subject;
                        }

                        if(!(lastSection in rows)){
                            rows[lastSection] = []
                        }

                        rows[lastSection].push(row);
                    }

                    this.setState({
                        dataSource : ds.cloneWithRowsAndSections(rows),
                        isLoading: false
                    });

                    resolve();
                });
            }, 300);
        });
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

                <ListView
                    dataSource={this.state.dataSource}
                    initialListSize={1}
                    pageSize={2000}
                    renderSectionHeader={this._renderSectionHeaderView.bind(this)}
                    renderRow={this._renderRowView.bind(this)}
                    enableEmptySections={true}
                    renderSeparator={this._renderSeparatorView.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={this.load.bind(this)}
                            tintColor="#007AFF"
                            title="Loading..."
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#007AFF"
                        />
                    }
                />

            </View>
        )
    }
};

export default Detail;