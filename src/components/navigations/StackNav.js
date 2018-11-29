import { createStackNavigator, createAppContainer } from 'react-navigation';
import DrawerNav from './DrawerNav';
import ContentScreen from '../screens/ContentScreen';

const StackNav = createStackNavigator(
    {
        DrawerNav: {
            screen: DrawerNav,
            navigationOptions: {
                header: null
            }
        },
        Details: {
            screen: ContentScreen
        }
    }
);

export default createAppContainer(StackNav);
