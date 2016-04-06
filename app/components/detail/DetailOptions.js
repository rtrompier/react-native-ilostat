/**
 * Created by rtrompier on 30/03/16.
 */
import React, {StyleSheet, Text, View, Navigator, TouchableWithoutFeedback} from 'react-native';
import TranslationService from '../../services/TranslationService';
import FilterService from '../../services/FilterService';
import {RadioButtons} from 'react-native-radio-buttons'
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: Navigator.NavigationBar.Styles.General.NavBarHeight + 20
    },
    checkMark: {
        flex: 0.1,
        color: '#007AFF',
        fontWeight: 'bold',
        paddingTop: 8,
        fontSize: 20,
        alignSelf: 'center',
    },
    textStyle: {
        paddingTop: 10,
        paddingBottom: 10,
        color: 'black',
        flex: 1,
        fontSize: 14,
    },
    baseStyle: {
        flexDirection: 'row',
    },
    container: {
        backgroundColor: 'white',
        paddingLeft: 20,
        borderTopWidth: 1,
        borderTopColor: '#cccccc',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    sectionTitle: {
        color: '#555555',
        backgroundColor: '#eeeeee',
        paddingLeft: 20,
        paddingVertical: 10,
        fontSize: 14
    }
});

class DetailOptions extends React.Component {
    constructor(props) {
        super(props);

        this.options = FilterService.getYears();
        let checkListOption = this.options.filter((c) => {
            return c.key == FilterService.getCurrentYear();
        });

        this.state = {
            ...props,
            checkListOption: checkListOption[0]
        };
    }

    setSelectedOption(checkListOption) {
        FilterService.setCurrentYear(checkListOption);

        this.setState({
            checkListOption
        });

        //Actions.detail();
    }

    renderOption(option, selected, onSelect, index) {
        var style;
        var checkMark;

        if (index > 0) {
            style = [styles.baseStyle, {
                borderTopColor: '#eeeeee',
                borderTopWidth: 1,
            }];
        } else {
            style = styles.baseStyle;
        }

        if (selected) {
            checkMark = <Text style={styles.checkMark}>✓</Text>;
        }

        return (
            <TouchableWithoutFeedback onPress={onSelect} key={index}>
                <View style={style}>
                    <Text style={styles.textStyle}>{option}</Text>
                    {checkMark}
                </View>
            </TouchableWithoutFeedback>
        );
    }

    renderContainer(optionNodes) {
        return (
            <View style={styles.container}>{optionNodes}</View>
        );
    }

    render() {
        return (
            <View style={styles.viewContainer}>
                <View style={{backgroundColor: 'white'}}>
                    <Text style={styles.sectionTitle}>{TranslationService.translate('filter')}</Text>
                    <RadioButtons
                        options={ this.options }
                        onSelection={ this.setSelectedOption.bind(this) }
                        selectedOption={ this.state.checkListOption }
                        renderOption={ this.renderOption }
                        renderContainer={ this.renderContainer }
                    />
                </View>

                <Text>{FilterService.getCurrentYear()}</Text>
            </View>
        )
    }
};

export default DetailOptions;