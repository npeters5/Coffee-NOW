import React, { Component } from "react";
import { MapView } from "expo";
import { Marker } from "react-native-maps";
import { Text } from "react-native";

class CoffeeMap extends Component {
  render() {
    const { navigation } = this.props;
    const shops = navigation.getParam("shops", "NO-ID");
    console.log(shops);
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
    );
  }
}

export default CoffeeMap;
