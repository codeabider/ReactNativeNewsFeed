import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { colors, padding, fonts } from '../_base';

export default class InfoScreen extends Component {    
    render() {
        const { navigation } = this.props;
        
        return (
            <View style={styles.container}>
                <Text>Developed by: Harshdeep Bilaiya</Text>
                <Text>News Source: https://newsapi.org/</Text>
                <Button
                    style={ styles.button }
                    title='Home'
                    onPress={ () => navigation.navigate('Home') }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
