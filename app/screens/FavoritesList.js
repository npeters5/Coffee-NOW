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
import Favorite from "./Favorite";
import { onSignOut } from "../auth";
import ajax from "../ajax";

class FavoritesList extends Component {
  state = {
    favorites: []
  };

  async componentDidMount() {
    const favorites = await ajax.getFavorites();
    console.log(favorites);
    this.setState({ favorites });
    console.log(this.state.favorites);
  }

  // makeList = () => {
  //   const favs = this.state.favorites.map(item => {
  //     return <Text>{item}</Text>;
  //   });
  //   return favs;
  // };

  render() {
    return (
      <FlatList
        data={this.state.favorites}
        renderItem={({ item }) => (
          <View>
            <Favorite favorite={item} />
          </View>
        )}
        keyExtractor={item => item.id}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#eee",
    width: "100%"
  }
});

export default FavoritesList;
