import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import DrawerScreen from '../screens/DrawerScreen';

const DrawerNav = createDrawerNavigator({
    Home: {
        screen: HomeScreen
    }
},{
    initialRouteName: 'Home',
    contentComponent: DrawerScreen,
    drawerWidth: 300
});

export default createAppContainer(DrawerNav);
