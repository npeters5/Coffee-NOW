import React, { Component } from "react";
import { ScrollView, Text, Linking, View, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";
import { WebBrowser, MapView, Constants, Location, Permissions } from "expo";
import ajax from "../ajax";
import ShopsList from "./ShopsList";

class Home extends Component {
  async componentDidMount() {
    this._getLocationAsync();
    console.log(this.state.location);
    // const shops = await ajax.fetchCoffeeShops(
    //   this.state.location.coords.latitude,
    //   this.state.location.coords.longitude
    // );
    // console.log(shops);
    // this.setState({ shops });
  }

  state = {
    location: null,
    errorMessage: null
    // shops: []
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    console.log(Expo.Location.getProviderStatusAsync());
    console.log(this.state.location);
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() =>
            this.props.navigation.navigate("ShopsList", {
              lat: this.state.location.coords.latitude,
              long: this.state.location.coords.longitude
            })
          }
          title="Find Coffee Near Me"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Home;
