import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Linking, Alert } from 'react-native';
import { colors, padding, fonts } from '../_base';

export default class InfoScreen extends Component {    
    render() {
        const { navigation } = this.props;
        
        return (
            <View style={styles.container}>
                <Text style={styles.infoText}>
                    <Text style={{fontWeight: 'bold'}}>Developed by:</Text> Harshdeep Bilaiya</Text>
                <Text style={styles.infoText}>
                    <Text style={{fontWeight: 'bold'}}>News Source:</Text>
                    <Text onPress={() => { 
                        Linking.openURL('https://newsapi.org/')
                        .catch(err => {
                            Alert.alert('Something went wrong!')
                        })
                    }}> https://newsapi.org/</Text>
                </Text>
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
        flex: 1,
        padding: padding.lg,
        backgroundColor: colors.secondaryBackground,
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoText: {
        color: colors.normalText,
        fontSize: fonts.md,
        paddingBottom: padding.lg
    }
});
