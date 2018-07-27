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
import { Button, Card } from "react-native-elements";
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

  openNow = () => {
    console.log(this.state.shop.hours[0].is_open_now);
    if (this.state.shop.hours[0].is_open_now) {
      return (
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Open now? </Text>
          <Text style={{ fontSize: 16 }}>Yes</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Open now? </Text>
          <Text style={{ fontSize: 16 }}>No</Text>
        </View>
      );
    }
  };

  render() {
    const shop = this.state.shop;
    console.log(shop.hours);
    if (shop.photos) {
      return (
        <View style={{ backgroundColor: "rgb(58, 48, 66)", height: "100%" }}>
          <Animated.Image
            {...this.imagePanResponder.panHandlers}
            source={{ uri: shop.photos[this.state.imageIndex] }}
            style={[{ left: this.imageXPos }, styles.image]}
          />
          <View>
            <Text style={styles.title}>{shop.name}</Text>
          </View>
          <Card containerStyle={{ backgroundColor: "rgb(237, 255, 217)" }}>
            <View style={styles.footer}>
              <View>{this.openNow()}</View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Average Rating:{" "}
                </Text>

                <Text style={{ fontSize: 16 }}>{shop.rating} / 5</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  # of Reviews:{" "}
                </Text>
                <Text style={{ fontSize: 16 }}>{shop.review_count}</Text>
              </View>
              <View style={{ paddingTop: 10 }} />
              <Text>{shop.address[0]}</Text>
              <Text>{shop.address[1]}</Text>
              <Text>{shop.address[2]}</Text>
              <Text>Phone: {shop.display_phone}</Text>
            </View>
            <View>
              <Button
                backgroundColor="rgb(219 ,157 ,71)"
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
            <View style={{ paddingTop: 10 }} />
            <View>
              <Button
                backgroundColor="rgb(255, 120, 79)"
                title="Go to Yelp page"
                onPress={this.openShopUrl}
              />
            </View>
          </Card>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 5
            }}
          >
            <Text style={{ fontSize: 10, color: "white" }}>Powered by </Text>
            <Image source={require("../images/Yelp_trademark_RGB.png")} />
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
    padding: 10,
    fontWeight: "bold",
    backgroundColor: "rgb(255, 225, 156)"
  },
  footer: {
    flexDirection: "column",
    justifyContent: "space-around",
    paddingBottom: 15
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
