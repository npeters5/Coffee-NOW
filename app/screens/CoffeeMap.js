import React, { Component } from "react";
import { MapView } from "expo";
import { Marker } from "react-native-maps";
import { Text } from "react-native";

class CoffeeMap extends Component {
  render() {
    const { navigation } = this.props;
    const shops = navigation.getParam("shops", "NO-ID");
    const latlong = navigation.getParam("latlong", "NO-ID");
    // const long = navigation.getParam("longitude", "NO-ID");
    console.log(shops);
    console.log(shops[0].latitude);

    return (
      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: latlong.latitude,
          longitude: latlong.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <Marker
          pinColor={"blue"}
          coordinate={latlong}
          title={"You are here"}
          description={"Here is where you are"}
        />
        {shops.map(shop => (
          <Marker key={shop.id} coordinate={shop.coords} title={shop.name} />
        ))}
      </MapView>
    );
  }
}

export default CoffeeMap;
