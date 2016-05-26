/**
 * Created by rtrompier on 09/03/16.
 */
import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Navigator} from 'react-native';
import {Scene, Router, Actions} from 'react-native-router-flux';

import List from './list/List';
import Detail from './detail/Detail';
import DetailOptions from './detail/DetailOptions';
import Description from './description/Description';
import Option from './option/Option';
import Chart from './chart/Chart';

import TranslationService from '../services/TranslationService';
import FilterService from '../services/FilterService';

class Main extends React.Component{
    constructor(){
        super();

        //init du module de translation
        this.translationService = new TranslationService();
        this.filterService = new FilterService();
    }

    
    _countries(){
        Actions.list();
    }

    _options(){
        Actions.options();
    }

    _chart(){
        Actions.chart();
    }

    _detailOptions(){
        Actions.detailOptions(this.state);
    }

    render(){
        return (
            <Router>
                <Scene key="root">
                    <Scene key="list" component={List} title="ILOSTAT CP" initial={true} rightTitle="Options" onRight={this._options}/>
                    <Scene key="detail" component={Detail} title="Detail" onLeft={this._countries} rightTitle={FilterService.getCurrentYear()} onRight={this._detailOptions}/>
                    <Scene key="detailOptions" component={DetailOptions} title="Filtre"/>
                    <Scene key="description" component={Description} title="Description" rightTitle="Chart" onRight={this._chart}/>
                    <Scene key="chart" component={Chart} title="Chart"/>

                    <Scene key="options" component={Option} title="Options" direction="vertical"/>
                </Scene>
            </Router>
        )
    }
};


export default Main;