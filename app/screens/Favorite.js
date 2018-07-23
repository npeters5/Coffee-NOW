import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import ajax from "../ajax";

class Favorite extends Component {
  state = {
    favorite: this.props
  };
  async componentDidMount() {
    const { favorite } = this.props;
    const fav = await ajax.fetchShopDetail(favorite.shop_id);
    console.log(fav);
    this.setState({
      favorite: fav
    });
    console.log(this.state.favorite);
  }
  render() {
    return (
      <TouchableOpacity style={styles.shop}>
        <View style={styles.info}>
          <Text style={styles.title}>{this.state.favorite.name}</Text>
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

export default Favorite;
