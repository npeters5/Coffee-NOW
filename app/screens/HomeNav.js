import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import ShopsList from "./ShopsList";
import Home from "./Home";

const homeNav = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: "Home"
    })
  },
  ShopsList: {
    screen: ShopsList,
    navigationOptions: props => ({
      title: "Shops"
    })
  }
});

export default homeNav;
