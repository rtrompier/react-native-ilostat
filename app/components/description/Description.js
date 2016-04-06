/**
 * Created by rtrompier on 30/03/16.
 */
import React, {StyleSheet, Text, View, ListView, ScrollView, Navigator} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: Navigator.NavigationBar.Styles.General.NavBarHeight + 20,
        padding: 20
    }
});


class Description extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{marginTop: 20}}>{this.state.indicator.indicator.label}</Text>
                <Text style={{marginTop: 50}}>{this.state.description}</Text>
            </View>
        )
    }
}
;


export default Description;