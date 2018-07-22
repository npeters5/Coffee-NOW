import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";

class Shop extends Component {
  render() {
    const { shop } = this.props;

    return (
      <TouchableOpacity style={styles.shop}>
        <Image source={{ uri: shop.image_url }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{shop.name}</Text>
        </View>
        <Text />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  shop: {
    marginHorizontal: 12,
    marginTop: 12
  },
  image: {
    width: "100%",
    height: 150,
    backgroundColor: "#ccc"
  },
  info: {
    padding: 10,
    backgroundColor: "#fff",
    borderColor: "#bbb",
    borderWidth: 1,
    borderTopWidth: 0
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  footer: {
    flexDirection: "row"
  },
  cause: {
    flex: 2
  },
  price: {
    flex: 1,
    textAlign: "right"
  }
});

export default Shop;
