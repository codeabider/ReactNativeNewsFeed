import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import NewsContentComponent from '../NewsContentComponent';
import { colors } from '../_base';

export default class ContentScreen extends Component {
    static navigationOptions = {
        title: 'News Details',
        headerTintColor: colors.secondaryBackground,
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTitleStyle: {
            flex: 1
        }
    }
    
    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <NewsContentComponent
                    newsContent={ navigation.state.params.item }
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
