/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
/*
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    TouchableHighlight,
    Text,
    View
} from 'react-native';
import {Scene, Router, Actions} from 'react-native-router-flux';

class Main extends Component {
    _handleDescription(){
        Actions.login();
    }

    render(){
        return(
            <View style={{marginTop: 100}}>
                <Text>Main page</Text>
                <TouchableHighlight onPress={this._handleDescription.bind(this)} underlayColor="white">
                    <Text>Button</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

class Login extends Component {
    render(){
        return(
            <View style={{marginTop: 100}}><Text>Login page</Text></View>
        )
    }
}

class IloStats extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="main" component={Main} title="Main" initial={true}/>
                    <Scene key="login" component={Login} title="Login"/>
                </Scene>
            </Router>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('IloStats', () => IloStats);
*/


import Example from './node_modules/react-native-router-flux/src/Example';

AppRegistry.registerComponent('Example', () => Example);