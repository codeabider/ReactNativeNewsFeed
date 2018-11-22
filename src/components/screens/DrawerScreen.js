import React, {Component} from 'react';
import { NavigationActions, DrawerActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { ScrollView, Text, View } from 'react-native';

class DrawerScreen extends Component {
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }

    render () {
        return (
            <View>
                <ScrollView>
                    <View>
                        <View style={styles.menuItem}>
                            <Text onPress={this.navigateToScreen('Home')}>
                            Home
                            </Text>
                        </View>
                        <View style={styles.menuItem}>
                            <Text onPress={this.navigateToScreen('Info')}>
                            About
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

DrawerScreen.propTypes = {
    navigation: PropTypes.object
};

export default DrawerScreen;