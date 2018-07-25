import React, { Component } from "react";
import {
  ScrollView,
  Text,
  Linking,
  View,
  StyleSheet,
  Alert,
  ImageBackground
} from "react-native";
import { Card, Button } from "react-native-elements";
import { WebBrowser, MapView, Constants, Location, Permissions } from "expo";
import ajax from "../ajax";
import ShopsList from "./ShopsList";
import Loader from "./Loader";

class Home extends Component {
  async componentDidMount() {
    this._getLocationAsync();
    console.log(this.state.location);
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 4500);
  }

  state = {
    location: null,
    errorMessage: null,
    loading: true
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    console.log(Expo.Location.getProviderStatusAsync());
    console.log(this.state.location);
  };

  render() {
    return (
      <ImageBackground
        source={require("../images/coffeebeans.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <Loader loading={this.state.loading} />
        <View style={styles.container}>
          <Button
            backgroundColor="rgb(219 ,157 ,71)"
            onPress={() =>
              this.props.navigation.navigate("ShopsList", {
                lat: this.state.location.coords.latitude,
                long: this.state.location.coords.longitude
              })
            }
            title="Find Coffee Near Me"
            textStyle={{ fontSize: 20 }}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover"
  }
});

export default Home;
