import React, { Component } from "react";
import {
  ScrollView,
  Text,
  Linking,
  View,
  Image,
  FlatList,
  StyleSheet
} from "react-native";
import { Card, Button } from "react-native-elements";
import Shop from "./Shop";
import ajax from "../ajax";
import ShopDetail from "./ShopDetail";
import Loader from "./Loader";

class ShopsList extends Component {
  state = {
    shops: [],
    latitude: this.props.navigation.getParam("lat", "NO-ID"),
    longitude: this.props.navigation.getParam("long", "NO-ID"),
    loading: true
  };

  async componentDidMount() {
    const shops = await ajax.fetchCoffeeShops(
      this.state.latitude,
      this.state.longitude
    );
    console.log(shops);
    setTimeout(() => {
      this.setState({
        shops: shops,
        loading: false
      });
    }, 1200);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#rgb(58, 48, 66)" }}>
        <Loader loading={this.state.loading} />
        <Button
          backgroundColor="rgb(219 ,157 ,71)"
          style={{ paddingTop: 15, paddingBottom: 20 }}
          onPress={() =>
            this.props.navigation.navigate("CoffeeMap", {
              shops: this.state.shops,
              latlong: {
                latitude: this.state.latitude,
                longitude: this.state.longitude
              }
            })
          }
          title="Map View"
        />
        <FlatList
          data={this.state.shops}
          renderItem={({ item }) => (
            <View>
              <Shop shop={item} />
              <Button
                onPress={() =>
                  this.props.navigation.navigate("ShopDetail", {
                    initialShopData: item
                  })
                }
                title="See Details"
              />
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#rgb(58, 48, 66)",
    width: "100%"
  }
});

export default ShopsList;
