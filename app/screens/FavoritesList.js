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

  _keyExtractor = (item, index) => {
    console.log(item.shop_id);
    // console.log(index);
    toString(item.shop_id);
  };

  render() {
    return (
      <View style={{ flex: 1, marginTop: 34 }}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          data={this.state.favorites}
          keyExtractor={(item, index) => item.shop_id.toString()}
          renderItem={({ item, index }) => <Favorite favorite={item} />}
        />
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

export default FavoritesList;
