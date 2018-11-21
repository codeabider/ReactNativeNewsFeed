import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './src/components/screens/HomeScreen';

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        }
    },
    {
        initialRouteName: 'Home'
    }
);

export default createAppContainer(AppNavigator);
