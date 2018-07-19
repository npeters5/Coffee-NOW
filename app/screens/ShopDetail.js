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
  StyleSheet
} from "react-native";
import { Button } from "react-native-elements";
import ajax from "../ajax";

class ShopDetail extends Component {
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

  state = {
    shop: this.props.navigation.getParam("initialShopData", "NO-ID"),
    imageIndex: 0
  };

  async componentDidMount() {
    const fullShop = await ajax.fetchShopDetail(this.state.shop.id);
    this.setState({
      shop: fullShop
    });
    console.log(this.state.shop);
  }

  openShopUrl = () => {
    Linking.openURL(this.state.shop.url);
  };

  render() {
    const { shop } = this.state;
    return (
      <View>
        <Text>{shop.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shop: {},
  image: {
    width: "100%",
    height: 150,
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
