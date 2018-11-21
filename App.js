import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './src/components/screens/HomeScreen';
import ContentScreen from './src/components/screens/ContentScreen';

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Details: {
            screen: ContentScreen
        }
    },
    {
        initialRouteName: 'Home'
    }
);

export default createAppContainer(AppNavigator);
