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
        flex: 1,
        padding: padding.md,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background
    }
});

export default LoaderComponent;