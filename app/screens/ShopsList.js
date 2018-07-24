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
    const shops = await ajax.fetchCoffeeShops(
      this.state.latitude,
      this.state.longitude
    );
    console.log(shops);
    this.setState({ shops });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#rgb(58, 48, 66)" }}>
        <Button
          style={{ paddingTop: 15 }}
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
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 10
          }}
        >
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
    backgroundColor: "#rgb(58, 48, 66)",
    width: "100%"
  }
});

export default ShopsList;
