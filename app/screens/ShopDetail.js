import React, { Component } from "react";
import {
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
  Linking,
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { Button } from "react-native-elements";
import ajax from "../ajax";
import auth from "../auth";
import { USER_API_TOKEN } from "../auth";

class ShopDetail extends Component {
  state = {
    shop: this.props.navigation.getParam("initialShopData", "NO-ID"),
    imageIndex: 0,
    favorited: this.props.navigation.getParam("initialShopData", "NO-ID")
      .favorited
  };

  async componentDidMount() {
    const fullShop = await ajax.fetchShopDetail(this.state.shop.id);
    console.log(fullShop);
    this.setState({
      shop: fullShop,
      favorited: fullShop.favorited
    });
    console.log(this.state.shop);
  }

  imageXPos = new Animated.Value(0);
  imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gs) => {
      this.imageXPos.setValue(gs.dx);
    },
    onPanResponderRelease: (evt, gs) => {
      this.width = Dimensions.get("window").width;
      if (Math.abs(gs.dx) > this.width * 0.4) {
        const direction = Math.sign(gs.dx);
        // -1 for left, 1 for right
        Animated.timing(this.imageXPos, {
          toValue: direction * this.width,
          duration: 250
        }).start(() => this.handleSwipe(-1 * direction));
      } else {
        Animated.spring(this.imageXPos, {
          toValue: 0
        }).start();
      }
    }
  });

  handleSwipe = indexDirection => {
    if (!this.state.shop.photos[this.state.imageIndex + indexDirection]) {
      Animated.spring(this.imageXPos, {
        toValue: 0
      }).start();
      return;
    }
    this.setState(
      prevState => ({
        imageIndex: prevState.imageIndex + indexDirection
      }),
      () => {
        this.imageXPos.setValue(indexDirection * this.width);
        Animated.spring(this.imageXPos, {
          toValue: 0
        }).start();
      }
    );
  };

  openShopUrl = () => {
    Linking.openURL(this.state.shop.url);
  };

  addToFavorites = () => {
    ajax.addFavorite(this.state.shop.id).then(() => {
      console.log("are we here?");
      this.setState({ favorited: true });
      console.log(this.state.favorited);
    });
  };

  removeFromFavorites = () => {
    ajax.removeFavorite(this.state.shop.id).then(() => {
      console.log("inside removeFromFavorites");
      this.setState({ favorited: false });
      console.log(this.state.favorited);
    });
  };

  render() {
    const shop = this.state.shop;
    console.log(shop);
    console.log(this.state.favorited);
    if (shop.photos) {
      return (
        <View>
          <Animated.Image
            {...this.imagePanResponder.panHandlers}
            source={{ uri: shop.photos[this.state.imageIndex] }}
            style={[{ left: this.imageXPos }, styles.image]}
          />
          <View>
            <View>
              <Text style={styles.title}>{shop.name}</Text>
            </View>
            <View style={styles.footer}>
              <View style={styles.info}>
                <Text style={styles.price}>Average Rating: {shop.rating}</Text>
                <Text style={styles.cause}>
                  # of Reviews: {shop.review_count}
                </Text>
              </View>
              <View style={styles.user}>
                <Text>{shop.address}</Text>
              </View>
            </View>
            <View style={styles.description}>
              <Text>Phone: {shop.display_phone}</Text>
            </View>
            <View>
              <Button
                title={
                  this.state.favorited
                    ? "Remove from Favorites"
                    : "Add to Favorites"
                }
                onPress={
                  this.state.favorited
                    ? this.removeFromFavorites
                    : this.addToFavorites
                }
              />
            </View>
            <View>
              <Button title="Go to Yelp page" onPress={this.openShopUrl} />
            </View>
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  }
}

const styles = StyleSheet.create({
  shop: {},
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#ccc"
  },

  title: {
    fontSize: 16,
    padding: 10,
    fontWeight: "bold",
    backgroundColor: "rgba(237, 149, 45, 0.4)"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 15
  },
  info: {
    alignItems: "center"
  },
  cause: {
    marginVertical: 10
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  description: {
    borderStyle: "dotted",
    margin: 10,
    padding: 10
  }
});

export default ShopDetail;
