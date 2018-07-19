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

class ShopsList extends Component {
  state = {
    shops: [],
    latitude: this.props.navigation.getParam("lat", "NO-ID"),
    longitude: this.props.navigation.getParam("long", "NO-ID")
  };
  async componentDidMount() {
    // const { navigation } = this.props;
    // const lat = navigation.getParam("lat", "NO-ID");
    // const long = navigation.getParam("long", "NO-ID");
    const shops = await ajax.fetchCoffeeShops(
      this.state.latitude,
      this.state.longitude
    );
    console.log(shops);
    this.setState({ shops });
    // console.log(this.state.shops);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
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
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          <View style={styles.list}>
            <FlatList
              data={this.state.shops}
              renderItem={({ item }) => (
                <Card>
                  <Shop shop={item} />
                  <Button
                    onPress={() =>
                      this.props.navigation.navigate("ShopDetail", {
                        initialShopData: item
                      })
                    }
                    title="See Details"
                  />
                </Card>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#eee",
    width: "100%"
  }
});

export default ShopsList;
