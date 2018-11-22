import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors, padding, fonts } from '../_base';

const GoToTopButtonComponent = (props) => {
    return (
        <View style={ styles.container }>
            <Text
                style={ styles.button }
                onPress={ props.onButtonPressed }
            >TOP</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: padding.md,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: -10,
        right: 0,
        height: 60,
        width: 60,
        borderRadius: 30,
        margin: padding.md,
    },
    button: {
        paddingTop: padding.lg,
        paddingBottom: padding.lg,
        paddingLeft: padding.md,
        backgroundColor: colors.secondary,
        color: colors.secondaryBackground,
        fontWeight: 'bold',
        fontSize: fonts.sm,
        height: 60,
        width: 60,
        borderRadius: 30
    }
});

export default GoToTopButtonComponent;