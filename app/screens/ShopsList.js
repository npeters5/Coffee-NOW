import React, { Component } from "react";
import { ScrollView, Text, Linking, View } from "react-native";
import { Card, Button } from "react-native-elements";
import ajax from "../ajax";

const images = [
  {
    key: 1,
    name: "Nathan Anderson",
    image: require("../images/1.jpg"),
    url: "https://unsplash.com/photos/C9t94JC4_L8"
  },
  {
    key: 2,
    name: "Jamison McAndie",
    image: require("../images/2.jpg"),
    url: "https://unsplash.com/photos/waZEHLRP98s"
  },
  {
    key: 3,
    name: "Alberto Restifo",
    image: require("../images/3.jpg"),
    url: "https://unsplash.com/photos/cFplR9ZGnAk"
  },
  {
    key: 4,
    name: "John Towner",
    image: require("../images/4.jpg"),
    url: "https://unsplash.com/photos/89PFnHKg8HE"
  }
];

class ShopsList extends Component {
  state = {
    shops: []
  };
  async componentDidMount() {
    const { navigation } = this.props;
    const lat = navigation.getParam("lat", "NO-ID");
    const long = navigation.getParam("long", "NO-ID");
    const shops = await ajax.fetchCoffeeShops(lat, long);
    this.setState({ shops });
    console.log(this.state.shops);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          {this.state.shops.map(({ id, name, image_url }) => (
            <Card title={`${name}`} image={image_url} key={id}>
              <Text style={{ marginBottom: 10 }}>{name}.</Text>
              <Button
                backgroundColor="#03A9F4"
                title="See Detail"
                onPress={() => Linking.openURL(image_url)}
              />
            </Card>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default ShopsList;
