import React, { Component } from "react";
import {
  ScrollView,
  Text,
  Linking,
  View,
  Image,
  FlatList,
  StyleSheet,
  RefreshControl
} from "react-native";
import { Card, Button } from "react-native-elements";
import Favorite from "./Favorite";
import { onSignOut } from "../auth";
import ajax from "../ajax";

class FavoritesList extends Component {
  constructor(props) {
    super(props);
    this.fetchData();
    console.log(props.navigation);
    this.state = {
      refreshing: false,
      favorites: []
    };
    const loadListener = this.props.navigation.addListener(
      "willFocus",
      payload => {
        console.debug("willFocus");
        this.fetchData();
      }
    );
  }

  async fetchData() {
    const favorites = await ajax.getFavorites();
    console.log(favorites);
    this.setState({ favorites });
    console.log(this.state.favorites);
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchData().then(() => {
      this.setState({ refreshing: false });
    });
  };

  // componentDidMount() {
  //   this.fetchData();
  // }

  render() {
    return (
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        data={this.state.favorites}
        renderItem={({ item }) => <Favorite favorite={item} />}
        keyExtractor={item => toString(item.id)}
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
