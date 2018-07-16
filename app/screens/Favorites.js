import React from "react";
import { View } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { onSignOut } from "../auth";

const mockData = [
  "Coffe Shop 1",
  "Coffee Shop 2",
  "Coffee Shop 3",
  "Coffee Shop 4"
];

makeList = () => {
  const shopList = mockData.map(item => {
    return <Text>{item}</Text>;
  });
  return shopList;
};

export default ({ navigation }) => (
  <View style={{ paddingVertical: 20 }}>
    <View
      style={{
        backgroundColor: "#bcbec1",
        alignItems: "center",
        justifyContent: "center",
        width: 80,
        height: 80,
        borderRadius: 40,
        alignSelf: "center",
        marginBottom: 20
      }}
    />
    <Button
      backgroundColor="#03A9F4"
      title="SIGN OUT"
      onPress={() => onSignOut().then(() => navigation.navigate("SignedOut"))}
    />
    <View>{this.makeList()}</View>
  </View>
);
