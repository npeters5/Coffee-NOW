import React from "react";
import { Platform, StatusBar } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import HomeNav from "./screens/HomeNav";
import Profile from "./screens/Profile";
import FavoritesList from "./screens/FavoritesList";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = createStackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up",
      headerStyle
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In",
      headerStyle
    }
  }
});

const FavsList = createStackNavigator({
  FavoritesList: {
    screen: FavoritesList,
    navigationOptions: {
      title: "Favorites",
      headerStyle
    }
  }
});

const Prof = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: "Profile",
      headerStyle
    }
  }
});

export const SignedIn = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNav,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="home" size={30} color={tintColor} />
        )
      }
    },
    FavoritesList: {
      screen: FavsList,
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarLabel: "Favorites",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="heart" size={30} color={tintColor} />
        ),
        tabBarOnPress: () =>
          navigation.navigate("FavoritesList", { refreshData: true })
      })
    },
    Profile: {
      screen: Prof,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="user" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }
    }
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
