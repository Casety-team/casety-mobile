import { createStackNavigator } from "react-navigation-stack";

import Home from "../screens/home";
import ReviewDetails from "../screens/reviewDetails";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Accueil",
    },
  },
  ReviewDetails: {
    screen: ReviewDetails,
    navigationOptions: {
      title: "Review Details",
    },
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#FF0000",
    headerStyle: {
      backgroundColor: "#eee",
      height: 60,
    },
  },
});

export default HomeStack;
