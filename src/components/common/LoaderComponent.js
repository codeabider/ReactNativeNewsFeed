import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, padding } from '../_base';

const LoaderComponent = (props) => {
    return (
        props.isLoading ? (
            <View style={ styles.container }>
                <ActivityIndicator
                    size="large"
                    color={ colors.secondary }
                />
            </View>
        ) : false
    )
}

const styles = StyleSheet.create({
    container: {
        padding: padding.md
    }
});

export default LoaderComponent;