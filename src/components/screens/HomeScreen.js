import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Picker,
    Text
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { DrawerActions } from 'react-navigation'
import NewsListComponent from '../NewsListComponent';
import { colors, fonts, padding } from '../_base';

export default class HomeScreen extends Component {
    static navigationOptions = () => ({
        // title: 'News Home',
        // headerTintColor: colors.secondaryBackground,
        // headerStyle: {
        //   backgroundColor: colors.primary
        // },
        // headerTitleStyle: {
        //     flex: 1,
        //     textAlign: 'center'
        // }
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            country: 'in',
            topic: ''
        }
    }

    componentDidMount() {
        SplashScreen.hide()
    }

    render() {
        const { navigation } = this.props;
        const { country } = this.state;

        return (
            <View style={styles.container}>
                <StatusBar 
                    backgroundColor={colors.background}
                    barStyle='light-content' // for iOS
                />
                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}
                        onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }
                    >Country: </Text>
                    <Picker
                        selectedValue={country}
                        style={styles.picker}
                        onValueChange={ (itemValue, itemIndex) =>
                            this.setState({country: itemValue}) }>
                        <Picker.Item label='India' value='in' />
                        <Picker.Item label='USA' value='us' />
                    </Picker>
                </View>
                <NewsListComponent
                    // page={ 1 }
                    // pageSize={ 3 }
                    // disableInfiniteScroll={ false }
                    country={ country }
                    onNewsSelect={item => navigation.navigate('Details', {item})}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        paddingBottom: 90
    },
    pickerContainer: {
        flexDirection: 'row',
        backgroundColor: colors.secondary,
        marginTop: 95,
        marginLeft: padding.sm,
        marginRight: padding.sm,
        padding: padding.md,
        borderRadius: 10
    },
    pickerLabel: {
        flex: 1,
        height: 30,
        color: colors.textWhite,
        fontSize: fonts.md,
        fontWeight: 'bold',
        paddingTop: 3
    },
    picker: {
        flex: 3,
        height: 30,
        color: colors.textWhite
    }
});