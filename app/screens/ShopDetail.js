import React, { Component } from "react";
import { ScrollView, Text, View, Image, StyleSheet } from "react-native";

class ShopDetail extends Component {
  render() {
    const { navigation } = this.props;
    const shop = navigation.getParam("shop", "NO-ID");
    return (
      <View>
        <Text>Shop Detail View</Text>
        <Text>{shop.name}</Text>
        <Text>{shop.id}</Text>
        <Text>{shop.image_url}</Text>
        <Text>Average Rating: {shop.rating}</Text>
        <Text>Latitude: {shop.latitude}</Text>
        <Text>Longitude: {shop.longitude}</Text>
      </View>
    );
  }
}

export default ShopDetail;
