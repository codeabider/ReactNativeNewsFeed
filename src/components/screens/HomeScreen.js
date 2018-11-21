import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    StatusBar
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import NewsListComponent from '../NewsListComponent';
import { colors, fonts } from '../_base';

export default class HomeScreen extends Component {
    static navigationOptions = () => ({
        title: 'News Home',
        headerTintColor: colors.secondaryBackground,
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center'
        }
    });

    componentDidMount() {
        SplashScreen.hide()
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <StatusBar 
                    backgroundColor={colors.background}
                    barStyle="light-content" // for iOS
                />
                {/* <NewsListComponent
                    id={ '0' }
                    limit={ 3 }
                    disableInfiniteScroll={ true }
                    onNewsSelect={ id => navigation.navigate('Book', {id}) }
                /> */}
                <NewsListComponent
                    onNewsSelect={title => navigation.navigate('Details', {title})}
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
        backgroundColor: colors.background
    }
});