import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import InfoScreen from '../screens/InfoScreen';

const DrawerNav = createDrawerNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Info: {
            screen: InfoScreen
        }
    },
    {
        drawerWidth: 200
    }
);

export default createAppContainer(DrawerNav);
