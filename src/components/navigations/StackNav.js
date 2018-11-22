import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ContentScreen from '../screens/ContentScreen';
import DrawerNav from './DrawerNav';

const StackNav = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Details: {
            screen: ContentScreen
        },
        Drawer: {
            screen: DrawerNav
        }
    },
    {
        initialRouteName: 'Home'
    }
);

export default createAppContainer(StackNav);
